import React from "react";
import Backendless from "backendless";
import styles from "./Dashboard.module.scss";
import Panel from "../../ui/panel/Panel";
import Input from "../../ui/input/Input";
import Button from "../../ui/button/Button";

class Dashboard extends React.Component {
  state = {
    company: null,
    newTeamName: "",
    teams: [],
    selectedTeam: null
  };

  componentDidMount() {
    Backendless.Data.of("Company")
      .findFirst()
      .then(company => this.setState({ company }))
      .catch(console.log);
    Backendless.Data.of("Team")
      .find()
      .then(teams => this.setState({ teams }))
      .catch(console.log);
  }

  createTeam = () => {
    const { newTeamName, teams } = this.state;
    Backendless.Data.of("Team")
      .save({ name: newTeamName })
      .then(newTeam => {
        Backendless.Data.of("Team")
          .findFirst({ objectId: newTeam.objectId })
          .then(team => {
            this.setState({ teams: [...teams, team], newTeamName: "" });
          });
      })
      .catch(console.log);
  };

  createPosition = () => {
    const { newPositionName, selectedTeam } = this.state;
    Backendless.Data.of("Position")
      .save({ name: newPositionName, team: selectedTeam.objectId })
      .then(newPosition => {
        this.setState({
          selectedTeam: {
            ...selectedTeam,
            positions: [...selectedTeam.positions, newPosition]
          },
          newPositionName: ""
        });
      })
      .catch(console.log);
  };

  handleTeamNameChange = e => {
    this.setState({ newTeamName: e.target.value });
  };

  handlePositionNameChange = e => {
    this.setState({ newPositionName: e.target.value });
  };

  render() {
    const {
      teams,
      company,
      newTeamName,
      selectedTeam,
      newPositionName
    } = this.state;

    return (
      <div className={styles.Container}>
        <h1>Dashboard</h1>
        <Panel>
          <h2>Company</h2>
          {company && (
            <ul>
              <li>name: {company.name}</li>
              <li>CEO: {company.ceo.name}</li>
            </ul>
          )}
        </Panel>
        <Panel>
          <h2>Teams</h2>
          <ul>
            {teams.length === 0
              ? "No teams yet"
              : teams.map(t => (
                  <li key={t.objectId}>
                    <Button onClick={() => this.setState({ selectedTeam: t })}>
                      {t.name}
                    </Button>
                  </li>
                ))}
          </ul>
          <h2>Add new team</h2>
          Team name:{" "}
          <Input
            value={newTeamName}
            onChange={this.handleTeamNameChange.bind(this)}
          />
          <Button onClick={this.createTeam.bind(this)}>Create</Button>
        </Panel>
        <Panel>
          <h2>Team</h2>
          {!selectedTeam ? (
            "No team selected"
          ) : (
            <>
              <ul>
                <li>{selectedTeam.name}</li>
              </ul>
              <h2>Team positions</h2>
              {selectedTeam.positions.length === 0 ? (
                "This team has no positions yet"
              ) : (
                <ul>
                  {selectedTeam.positions.map(p => (
                    <li key={p.objectId}>{p.name}</li>
                  ))}
                </ul>
              )}
              <h2>Add new position</h2>
              Position name:{" "}
              <Input
                value={newPositionName}
                onChange={this.handlePositionNameChange.bind(this)}
              />
              <Button onClick={this.createPosition.bind(this)}>Create</Button>
            </>
          )}
        </Panel>
      </div>
    );
  }
}

export default Dashboard;

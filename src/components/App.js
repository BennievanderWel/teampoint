import React from "react";
import Backendless from "backendless";

import Button from "../ui/button/Button";
import Input from "../ui/input/Input";
import Panel from "../ui/panel/Panel";

import styles from "./App.module.scss";
import "bulma/bulma.sass";

class App extends React.Component {
  state = {
    authenticated: false,
    currentUser: null,
    messages: [],
    message: ""
  };

  constructor() {
    super();
    Backendless.initApp(
      "6210F59C-7E01-5C03-FFB0-E54E129DC300",
      "FAD4019F-AB75-403B-86F8-F981DF388724"
    );
  }

  componentDidMount() {
    Backendless.UserService.getCurrentUser().then(user => {
      if (user) {
        this.setState({ currentUser: user, authenticated: true });
        this.getMessages();
      }
    });
  }

  login(email) {
    Backendless.UserService.login(email, "test", true)
      .then(user => {
        this.getMessages();
        this.setState({ currentUser: user, authenticated: true });
      })
      .catch(console.log);
  }

  logout() {
    Backendless.UserService.logout()
      .then(() =>
        this.setState({ authenticated: false, currentUser: null, messages: [] })
      )
      .catch(console.log);
  }

  getMessages() {
    const messagesTableRT = Backendless.Data.of("Messages").rt();

    const onObjectCreate = message =>
      this.setState(prevState => ({
        messages: [...prevState.messages, message]
      }));
    const onError = error => console.log("An error has occurred -", error);

    messagesTableRT.addCreateListener(onObjectCreate, onError);

    const queryBuilder = Backendless.DataQueryBuilder.create();
    queryBuilder.setSortBy(["created ASC"]);
    Backendless.Data.of("Messages")
      .find(queryBuilder)
      .then(messages => {
        this.setState({ messages });
      });
  }

  submitMessage(e) {
    e.preventDefault();

    const { message, currentUser } = this.state;
    Backendless.Data.of("Messages")
      .save({
        content: message,
        from: currentUser.objectId
      })
      .then(() => {
        this.setState({ message: "" });
      })
      .catch(console.log);
  }

  render() {
    const { authenticated, currentUser, messages, message } = this.state;

    return (
      <div className={styles.Container}>
        <h1>TapConnect</h1>
        {!authenticated && (
          <>
            <Button
              primary
              className={styles.LoginBtn}
              onClick={() => this.login("rens@test.com")}
            >
              Rens
            </Button>
            <Button
              primary
              className={styles.LoginBtn}
              onClick={() => this.login("marja@test.com")}
            >
              Marja
            </Button>
          </>
        )}
        {currentUser && (
          <div className={styles.Dashboard}>
            <Panel>
              <div className={styles.Chat}>
                {messages.map(m => (
                  <div
                    key={m.objectId}
                    className={
                      m.ownerId === currentUser.objectId
                        ? styles.MessageFrom
                        : styles.MessageTo
                    }
                  >
                    <span>{m.content}</span>
                  </div>
                ))}
              </div>
            </Panel>
            <form className={styles.Form} onSubmit={e => this.submitMessage(e)}>
              <Input
                className={styles.Input}
                fullWidth
                placeholder="Typ hier je bericht.."
                value={message}
                onChange={e => this.setState({ message: e.target.value })}
              />
              <Button type="submit">Stuur</Button>
            </form>
            <Button className={styles.LogoutBtn} onClick={() => this.logout()}>
              Logout
            </Button>
          </div>
        )}
        {/* {authenticated && currentUser.email === "rens@test.com" && (
          <div className={styles.Pictures}>
            <Panel>hoi</Panel>
          </div>
        )} */}
      </div>
    );
  }
}

export default App;

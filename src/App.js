import React, {Component} from 'react';
import {Spin, Layout, Menu} from "antd";

import {Route, Link, Switch, Redirect} from 'react-router-dom';

import s from './App.module.scss';
import FirebaseContext from "./context/firebaseContext";
import CurrentCard from "./pages/CurrentCard";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import {PrivateRoute} from "./utils/privateRoute";

const {Header, Content} = Layout;

class App extends Component {
    state = {
        user: null,
    }

    componentDidMount() {
        console.log('context: ', this.context);
        const { auth, setUserUid } = this.context;

        auth.onAuthStateChanged(user => {
            console.log('onAuthStateChanged user: ', user);
            if (user && !this.state.user) {
                setUserUid(user.uid);
                localStorage.setItem('user', JSON.stringify(user.uid));
                this.setState({
                    user,
                });
            } else {
                localStorage.removeItem('user');
                setUserUid(null);
                this.setState({
                    user: false,
                });
            }
        });
    }

    render() {
        const {user} = this.state;

        if (user === null) {
            return (
                <div className={s.loader_wrap}>
                    <Spin size="large" />
                </div>
            )
        }

        return (
            <Switch>
                <Route path="/login" component={LoginPage}/>
                <Route render={() => {
                    return (
                        <Layout>
                            <Header>
                                <Menu theme="dark" mode="horizontal">
                                    <Menu.Item key="1">
                                        <Link to="/">Home</Link>
                                    </Menu.Item>
                                    <Menu.Item key="2">
                                        <Link to="/word">Words</Link>
                                    </Menu.Item>
                                </Menu>
                            </Header>
                            <Content>
                                <Switch>
                                    <PrivateRoute path="/" exact component={HomePage}/>
                                    <PrivateRoute path="/home/:id?:isDone?" component={HomePage}/>
                                    <PrivateRoute path="/word/:id?" component={CurrentCard}/>
                                    <Redirect to='/' />
                                </Switch>
                            </Content>
                        </Layout>
                    )
                }}/>
            </Switch>
        );
    }
}

App.contextType = FirebaseContext;

export default App;
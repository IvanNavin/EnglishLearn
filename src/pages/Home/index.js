import React, {Component} from "react";
import {LogoutOutlined} from '@ant-design/icons'

import BackgroundBlock from "../../components/BackgroundBlock";
import Header from "../../components/Header";
import Paragraph from "../../components/Paragraph";
import Section from "../../components/Section";
import {ClockCircleOutlined, HomeOutlined, SmileOutlined} from "@ant-design/icons";
import CardList from "../../components/CardList";
import Button from "../../components/Button";
import Footer from "../../components/Footer";


import firstBackground from "../../assets/background.jpg";
import secondBackground from "../../assets/back2.jpg";

import s from './home.module.scss'
import TestContext from "../../context/testContext";
import FirebaseContext from "../../context/firebaseContext";

class HomePage extends Component {
    state = {
        wordArr: [],
    }

    componentDidMount() {
        const {getUserCardsRef} = this.context;

        getUserCardsRef().on('value', res => {
            console.log("res:", res.val());
            this.setState({
                wordArr: res.val() || [],
            })
        })
    }

    setNewWord = (card) => {
        const {wordArr} = this.state;
        const {getUserCardsRef} = this.context;

        getUserCardsRef().set([...wordArr, card]);
    }


    handleDeletedItem = (id) => {
        const {wordArr} = this.state;
        const {getUserCardsRef} = this.context;
        const newWordArr = wordArr.filter(item => item.id !== id);

        getUserCardsRef().set(newWordArr);
    }

    render() {
        const { wordArr } = this.state;
        const { logOut } = this.context;
        // console.log('user uid: ', this.props.user.uid);
        return (
            <>
                <BackgroundBlock
                    backgroundImg={firstBackground}
                    fullHeight
                >
                    <Header white>
                        Время учить слова онлайн
                    </Header>
                    <Paragraph white>
                        Используйте карточки для запоминания и пополняйте активный словарный запас.
                    </Paragraph>
                </BackgroundBlock>
                <Section className={s.textCenter}>
                    <Header size="l">
                        Мы создали уроки, чтобы помочь вам увереннее разговаривать на английском языке
                    </Header>
                    <div className={s.motivation}>
                        <div className={s.motivationBlock}>
                            <div className={s.icons}>
                                <ClockCircleOutlined />
                            </div>
                            <Paragraph small>
                                Учитесь, когда есть свободная минутка
                            </Paragraph>
                        </div>

                        <div className={s.motivationBlock}>
                            <div className={s.icons}>
                                <HomeOutlined />
                            </div>
                            <Paragraph small>
                                Откуда угодно — дома, в&nbsp;офисе, в&nbsp;кафе
                            </Paragraph>
                        </div>

                        <div className={s.motivationBlock}>
                            <div className={s.icons}>
                                <SmileOutlined />
                            </div>
                            <Paragraph small>
                                Разговоры по-английски без&nbsp;неловких пауз и&nbsp;«mmm,&nbsp;how&nbsp;to&nbsp;say…»
                            </Paragraph>
                        </div>
                    </div>
                </Section>
                <Section bgColor="#f0f0f0" className={s.textCenter}>
                    <Header size='l'>
                        Начать учить английский просто
                    </Header>
                    <Paragraph>
                        Кликай по карточкам и узнавай новые слова, быстро и легко!
                    </Paragraph>
                    <TestContext.Consumer>
                        {
                            () => {
                                return (
                                    <CardList
                                        onDeletedItem={this.handleDeletedItem}
                                        onAddItem={this.setNewWord}
                                        items={wordArr}
                                    />
                                )
                            }
                        }
                    </TestContext.Consumer>

                </Section>
                <BackgroundBlock
                    backgroundImg={secondBackground}
                >
                    <Header size="l" white>
                        Изучайте английский с персональным сайтом помощником
                    </Header>
                    <Paragraph white>
                        Начните прямо сейчас
                    </Paragraph>
                    <Button>
                        Начать бесплатный урок
                    </Button>
                </BackgroundBlock>
                <Footer/>
                <div className={s.logout_wrap}>
                    <LogoutOutlined
                        onClick={() => logOut()}
                        style={{width: '48px', height: '48px', fontSize: '48px', opacity: '0.2'}}
                    />
                </div>
            </>
        );
    }
}
HomePage.contextType = FirebaseContext;

export default HomePage;
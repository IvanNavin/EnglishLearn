import React, { Component } from 'react';
import Card from '../Card';
import {Input} from "antd";

import s from './CardList.module.scss';
import getTranslateWord from "../../services/dictionary";

const { Search } = Input;

class CardList extends Component {
    state = {
        value: '',
        isBusy: false,
    }

    handleInputChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }

    getTheWord = async () => {
        const {value} = this.state;
        const getWord = await getTranslateWord(this.state.value);
        let strArray = value.split('')
        let cryptId = strArray.map(value => value.charCodeAt(0) ^ 1).join('');

        const card = {
            id: cryptId,
            eng: value,
            rus: getWord.translate
        }

        this.props.onAddItem(card);
        this.setState({
            value: '',
            isBusy: false,
        })
    }

    handleSubmitForm = async () => {
        this.setState({
            isBusy: true,
        },this.getTheWord)
    }

    render() {
        const { items, onDeletedItem} = this.props;
        const {value, isBusy} = this.state;
        
        return (
            <>
                <div className={s.form}>
                    <Search
                        placeholder="input search text"
                        enterButton="Search"
                        size="large"
                        loading={isBusy}
                        value={value}
                        onSearch={this.handleSubmitForm}
                        onChange={(e) => this.handleInputChange(e)}
                    />
                </div>
                <div className={s.root}>
                    {
                        items.map(({ eng, rus, id }) => (
                            <Card
                                onDeleted={() => {
                                    onDeletedItem(id);
                                }}
                                key={id}
                                eng={eng}
                                rus={rus}
                            />
                        ))
                    }
                </div>
            </>
        );
    }
}

export default CardList;

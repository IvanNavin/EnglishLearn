import React from 'react';
import cl from 'classnames';
import { CheckSquareOutlined, DeleteOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { withRouter } from 'react-router-dom';

import s from './Card.module.scss';

class Card extends React.Component {
    state = {
        done: false,
        isRemembered: false
    }

    componentDidMount() {
        const { match: { params }, index } = this.props;

        if (index === +params.id) {
            this.setState({
                done: params.isDone
            })
        }
    }

    handleCardClick = () => {
        this.setState(({ done }) => {
            return {
                done: !done,
            }
        });
    }

    handleIsRememberClick = () => {
        this.setState(({ isRemembered }) => {
            return {
                isRemembered: !isRemembered
            }
        });
    }

    handleDeletedClick = () => {
        this.props.onDeleted();
    }

    render() {
        const {eng, rus} = this.props
        const { done, isRemembered } = this.state
        
        return (
            <div className={s.root}>
                <div
                    className={ cl(s.card, {
                        [s.done]: done,
                        [s.isRemembered]: isRemembered,
                    }) }
                    onClick={ !isRemembered ? this.handleCardClick : null }
                >
                    <div className={s.cardInner}>
                        <div className={s.cardFront}>
                            {eng}
                        </div>
                        <div className={s.cardBack}>
                            {rus}
                        </div>
                    </div>
                </div>
                <div className={s.icons}>
                    <CheckSquareOutlined onClick={this.handleIsRememberClick} />
                </div>
                <div className={cl(s.icons, s.deleted)}>
                    <DeleteOutlined onClick={this.handleDeletedClick}/>
                </div>
            </div>
        )
    }

}


export default withRouter(Card);
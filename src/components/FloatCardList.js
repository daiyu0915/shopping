import React from 'react'
import styles from './FloatCardList.css'
import { Button, Icon } from 'antd'
import { connect } from 'dva'

const ButtonGroup = Button.Group;

@connect(({ cart }) => ({
  count: cart.count
}))
class FloatCardList extends React.Component {


  addBtn = () => {
    const { data: { id, quantity } } = this.props
    console.log('addBtn', this.props.data)
    this.props.dispatch({
      type: 'cart/plusOne',
      payload: {
        id,
        quantity: quantity + 1
      }
    })
  }

  minusBtn = () => {
    const { data: { id, quantity } } = this.props
    console.log('minus', this.props.data)
    if (quantity > 1) {
      this.props.dispatch({
        type: 'cart/minusOne',
        payload: {
          id,
          quantity: quantity - 1
        }
      })
    }
  }

  // handleClose = () => {
  //   console.log('close...')
  //   const {data: {id}, dispatch} = this.props
  //   dispatch({
  //     type: 'shop/handleClose',
  //     payload: {
  //       id,
  //       quantity: 0
  //     }
  //   })
  // }

  render() {
    const { data } = this.props
    return (
      <div className={styles.main}>
        <img className={styles.img} alt="" src={`./imgs/${data.sku}_2.jpg`}></img>
        <div className={styles.info}>
          <p>{data.title}</p>
          <p>{data.availableSizes.map(res => (res + ' '))} | {data.style}</p>
          <p>Quantity: {data.quantity}</p>
        </div>
        <div className={styles.action}>
          <div style={{ color: 'brown', fontSize: '18px', fontWeight: '1000', cursor: 'pointer' }}>
            <Icon
              className={styles.icon_close}
              type="close"
              onClick={this.handleClose}
            />
          </div>
          <div style={{ color: 'brown', fontSize: '18px', marginBottom: '10px' }}>$ {data.price.toFixed(2)}</div>
          <div>
            <ButtonGroup>
              <Button type="primary" size="small"  style={{ borderRadius: 0 }} onClick={this.minusBtn}>-</Button>
              <Button type="primary" size="small"  style={{ borderRadius: 0 }} onClick={this.addBtn}>+</Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
    )
  }
}

export default FloatCardList
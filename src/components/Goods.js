import React from 'react';
import { connect } from 'dva';
import { Card, Button, Popover, List, } from 'antd';
import {
    SyncOutlined,
} from '@ant-design/icons';

@connect(({ shopData, cart }) => ({
    productData: shopData.productData,
    cartData: cart.cartData,
    amount: cart.amount,
    count: cart.count
}))

class Product extends React.Component {
    constructor() {
        super()
        this.state = {
            key: 0
        }
    }

    // eslint-disable-next-line react/no-deprecated
    async componentWillMount() {
        const { dispatch } = this.props
        await this.setState({
            key: 1
        })
        await dispatch({
            type: 'shopData/GetData'
        })
        if(window.localStorage.cartData){
            dispatch({
                type: 'cart/setStorage'
            })
        }
        await this.setState({
            key: 0
        })
    }

    addCart = async (data, size) => {
        const { dispatch } = this.props
        await dispatch({
            type: 'cart/addCart',
            payload: {
                data: data,
                size: size
            }
        })
    }

    render() {
        const { productData } = this.props
        const list = (productData || []).map((item, key) => (
            <Card className="cart" style={{ width: 300, margin: 10, borderRadius: "2%" }} key={key}>
                <img src={`./imgs/${item.sku}_1.jpg`} alt={item.title + "_1.jpg"} style={{ width: 252 }}></img>
                <h3 style={{ textAlign: 'center' }}>{item.title}</h3>
                <hr style={{ width: "10%", backgroundColor: 'black' }} />
                <h4 style={{ textAlign: 'center' }}>{item.currencyFormat + item.price}</h4>
                <Popover
                    content={
                        <List
                            size="small"
                            dataSource={item.availableSizes}
                            renderItem={size => <List.Item><Button onClick={() => this.addCart(item, size)} block>{size}</Button></List.Item>}
                        />
                    }
                    trigger="click">
                    <Button style={{ backgroundColor: 'brown', color: "#fff" }} size="large" block>Add To Cart</Button>
                </Popover>
            </Card>
        ));
        return (
            <>
                <div><h3 style={{ marginLeft: "-600px" }}>{` ${productData.length} was Found`}</h3></div>
                <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-around' }}>
                    {this.state.key ? (<div className="icons-list" style={{ fontSize: "50px",textAlign: "center" }}>
                        <SyncOutlined spin />
                    </div>) : list}
                </div>

            </>
        )
    }
}
export default Product;
import React from 'react'
import {connect} from 'dva'
import { Select } from 'antd';

const { Option } = Select;

@connect(({shop}) => ({
  products: shop.products,
  staticData: shop.staticData,
  staticSize: shop.staticSize
}))

class Shelf extends React.Component {
  onChange = (value) => {
    const { products, dispatch, staticSize, staticData } = this.props
    
    if(value === 'all') {
      dispatch({
        type: 'shop/filter',
        payload: [...staticData]
      })
    }
    else if(value === 'default') {
      if(staticSize.length === 0) {
        dispatch({
          type: 'shop/filter',
          payload: [...staticData]
        })
      }else {
        dispatch({
          type: 'shop/filter',
          payload: [...staticSize]
        })
      }
        
    }
    else if(value === 'd-h') {
      const sortProducts = products.sort((a, b) => (a['price'] - b['price']))
      // console.log('1111111', [...sortProducts])
      dispatch({
        type: 'shop/filter',
        payload: [...sortProducts]
      })
    }
    else {
      const sortProducts = products.sort((a, b) => (b['price'] - a['price']))
      // console.log(sortProducts)
      dispatch({
        type: 'shop/filter',
        payload: [...sortProducts]
      })
    }
  }


  render() {
    return (
      <Select
        // showSearch
        // style={{ width: 185, marginLeft: '10px', borderRadius: 0, color: 'black', fontSize: '18px' }}
        placeholder="排列顺序"
        optionFilterProp="children" //搜索时过滤对应的 option 属性，如设置为 children 表示对内嵌内容进行搜索
        onChange={this.onChange}
        filterOption={(input, option) =>//是否根据输入项进行筛选
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        <Option value="all">All</Option>
        <Option value="default">Default sort</Option>
        <Option value="d-h">Lowest to Highest</Option>
        <Option value="h-d"> Highest to Lowest</Option>
      </Select>
    )
  }
}


export default Shelf;




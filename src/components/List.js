import React from 'react';
import { connect } from 'dva';
import { Menu, Select } from 'antd';
// import { SkinOutlined } from '@ant-design/icons';

const { Option } = Select;
@connect(({ shopData }) => ({
    backupData: shopData.backupData,
    productData: shopData.productData,
}))

class List extends React.Component {
    onChange1 = (value) => {
        const { backupData, dispatch } = this.props
        dispatch({
            type: 'shopData/listData',
            payload: {
                data: backupData,
                value,
                i: 1
            }
        })
    }

    onChange2 = async (value) => {
        const { productData, dispatch } = this.props
        await dispatch({
            type: 'shopData/listData',
            payload: {
                data: productData,
                value,
                i: 0
            }
        })
    }



    render() {
        return (
            <>
                <Menu mode="horizontal" defaultSelectedKeys={['2']}>
                    <Select
                        placeholder="尺码筛选"
                        optionFilterProp="children" //搜索时过滤对应的 option 属性，如设置为 children 表示对内嵌内容进行搜索
                        onChange={this.onChange1}
                        filterOption={(input, option) =>//是否根据输入项进行筛选
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="S">S</Option>
                        <Option value="M">M</Option>
                        <Option value="L">L</Option>
                        <Option value="XL">XL</Option>
                        <Option value="XXL">XXL</Option>
                    </Select>

                    <Select
                        // showSearch
                        // style={{ width: 185, marginLeft: '10px', borderRadius: 0, color: 'black', fontSize: '18px' }}
                        placeholder="排列顺序"
                        optionFilterProp="children" //搜索时过滤对应的 option 属性，如设置为 children 表示对内嵌内容进行搜索
                        onChange={this.onChange2}
                        filterOption={(input, option) =>//是否根据输入项进行筛选
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="all">All</Option>
                        <Option value="default">Default sort</Option>
                        <Option value="d-h">Lowest to Highest</Option>
                        <Option value="h-d"> Highest to Lowest</Option>
                    </Select>
                </Menu>
            </>
        )
    }
}
export default connect()(List);
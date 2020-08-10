// import * as api from '../services/example'
import products from '../assets/products'

export default {
  namespace: 'shop',
  state: {
    name: 'chen',
    products: [], 
    cartData: [], 
    count: 0,
    subTotal: 0,   //总
    staticSize:[],
    filtedData:[],
    
  },
  effects: {

    *addToCart({ payload }, { put }) {
      // console.log('cart1', payload)
      yield put({
        type: 'cartData',
        payload: payload
      })    
    },
    *select({ payload }, { put }) {
      yield put({
        type: 'selectSizeData',
        size: payload
      })
      yield put({
        type: 'selectSize',
        size: payload
      })

      yield put({
        type: 'selectSizeStatic',
      })
    },
    *filter({ payload }, { put }) {
      yield put({
        type: 'filterProduct',
        data: payload
      })
    },
    
    *testMock({ payload }, { put, call }) {
      // let rel = yield call(apis.mockdata)
      // console.log(rel)
      
      if (products) {
        yield put({
          type: 'setProductData',
          data: products
        })

        yield put({
          type: 'setStaticData',
          data: products
        })
      }
    },
    *minusOne({ payload: {quantity, id} }, { put }) {
      yield put({
        type: 'countMinusOne',
        payload: {
          quantity,
          id
        }
      })

      yield put({
        type: 'subTotal',
      })
    },
    *plusOne({ payload: {quantity, id} }, { put }) {
      yield put({
        type: 'countPlusOne',
        payload: {
          quantity,
          id
        }
      })

      yield put({
        type: 'subTotal',
      })
    },
  },
  
  reducers: {
    
    filtData(state, {payload:{key}}){
      const data = state.initData
      // console.log("initdata",data)
      const size = key.key;
      // console.log(data,"size",size)
      let newList = []
      if(size==='ALL'){
        newList=data
      }
      if (size && data) {
        data.forEach(item => {
          if (item.availableSizes.indexOf(size)!==-1) {
            // console.log("筛筛筛筛")
            newList.push(item)
          }
        })
      }
      // payload=newList
      // console.log("筛",newList)
      return{
        ...state,
        products: newList,
        filtedData: newList
      }

    },
    filterProduct(state, payload) {
      return {
        ...state,
        products: payload.data
      }
    },
    setProductData(state, payload) {
      //  console.log('ContentList挂载后', payload.data)
      return {
        ...state,
        products: payload.data
      }
    },
    setStaticData(state, payload) {
      // console.log('setStaticData')
      return {
        ...state,
        staticData: payload.data
      }
    },

    selectSizeData(state, payload) {
      return {
        ...state,
        sizeData: state.sizeData.concat(payload.size)
      }
    },
    selectSize(state, payload) {
      // console.log('xxxxxxxxxx', payload)
      // state.sizeData = state.sizeData.concat(payload.size)
      const newSizeData = []
      for(let item1 of state.sizeData) {
        let flag = true
        for(let item2 of newSizeData) {
          if(item1.id === item2.id) {
            flag = false
          }
        }
        if(flag) {
          newSizeData.push(item1)
        }
      }
      return {
        ...state,
        products: newSizeData,
        newSizeData: newSizeData,
      }
    },
    selectSizeStatic(state, payload) {
      // console.log('xxxxxxxxxx', payload)
      return {
        ...state,
        staticSize: state.newSizeData
      }
    },
    subTotal(state, payload) {
      let subTotal = 0
      state.cartData.forEach(item => {
        subTotal = subTotal + item.price * item.quantity
      })
      return {
        ...state,
        subTotal
      }

    },
    countPlusOne(state, {payload: {quantity, id}}) {
      const { cartData } = state

      let count = 0
      cartData.forEach( item => {
        if (item.id === id) {
          item.quantity = quantity
        }

        count += item.quantity
      })

      return {
        ...state,
        cartData,
        count
      }
    },
    countMinusOne(state, {payload: {quantity, id}}) {
      const { cartData } = state

      let count = 0
      cartData.forEach( item => {
        if (item.id === id) {
          item.quantity = quantity
        }
        count += item.quantity
      })
      return {
        ...state,
        cartData,
        count
      }
    },
    cartData(state, { payload }) {
      console.log('cart2', payload.msg)
      console.log('cartData', state.cartData)
      const { cartData } = state
      const { msg } = payload

      let num = 0;
      let count = 0
      let subTotal = 0
      cartData.forEach(item => {
        if (item.id === msg.id) {
          item.quantity += 1;
        }
        else {
          num ++
        }
        count += item.quantity
        // subTotal = subTotal + item.price + (item.quantity - 1)
      })

      if (cartData.length === num) {
        cartData.push({
          ...msg,
          quantity: 1
        })
        count += 1
      }

      cartData.forEach(item => {
        subTotal  = subTotal + item.price * item.quantity
      })
      
      
      return {
        ...state,
        cartData,
        count,
        subTotal
      }
      
    },
    
  },
  
}

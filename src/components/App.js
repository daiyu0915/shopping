// import React from 'react'
// import Footer from './Footer'
// import AddTodo from '../containers/AddTodo'
// import VisibleTodoList from '../containers/VisibleTodoList'

// const App = () => (
//   <div>
//     <AddTodo />
//     <VisibleTodoList />
//     <Footer />
//   </div>
// )

// export default App

import React from 'react';
// import Shelf from '../Shelf';
// import Filter from '../Shelf/Filter';
// import FloatCart from '../FloatCart';
// import Productlist from './Productlist';
import Goods from './List';
import Product from './Goods';
// import Product from './Product';

const App = () => (
  <React.Fragment>
    <main>
      {/* <Filter /> */}
      <div style={{display:'flex',justifyContent:'center'}}>
      {/* <Productlist /> */}
      {/* <List /> */}
      </div>
      <div style={{display:'flex',justifyContent:'space-around'}}>
      <Product/>
      <Goods />
      </div>
    </main>
    {/* <FloatCart /> */}
  </React.Fragment>
);

export default App;

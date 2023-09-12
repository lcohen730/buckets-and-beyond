import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import styles from './App.module.scss';
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage';
import AboutUsPage from '../AboutUsPage/AboutUsPage';
import CategoryListPage from '../CategoryListPage/CategoryListPage';
import FAQPage from '../FAQPage/FAQPage';
import HomePage from '../HomePage/HomePage';
import ItemDetailPage from '../ItemDetailPage/ItemDetailPage';
import ItemListPage from '../ItemListPage/ItemListPage';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
import OrderPage from '../OrderPage/OrderPage';
import SearchResultsPage from '../SearchResultsPage/SearchResultsPage';
import UserProfilePage from '../UserProfilePage/UserProfilePage';
import WishlistPage from '../WishlistPage/WishlistPage';
import NavBar from '../../components/NavBar/NavBar'
import * as ordersAPI from '../../utilities/orders-api'
import * as catDepAPI from '../../utilities/catDep-api'
import * as wishAPI from '../../utilities/wishlist-api'

export default function App() {
  const [user, setUser] = useState(getUser())
  const [cart, setCart] = useState({})
  const [wishlist, setWishlist] = useState({})
  const [departments, setDepartments] = useState([])
  const navigate = useNavigate()

  useEffect(function () {
    async function getDeps() {
      const deps = await catDepAPI.getDepartments()
      setDepartments(deps)
    }
    getDeps()
    async function getCart() {
      const data = await ordersAPI.getCart()
      setCart(data)
    }
    getCart()
    async function getWishlist() {
      const data = await wishAPI.showWishlist()
      setWishlist(data)
    }
    getWishlist()
  }, [])

  async function handleAddToOrder(itemId) {
    const updatedCart = await ordersAPI.addToCart(itemId)
    setCart(updatedCart)
  }

  async function handleChangeQty(itemId, newQty) {
    const updatedCart = await ordersAPI.setItemQtyInCart(itemId, newQty)
    setCart(updatedCart)
  }

  async function handleCheckout() {
    await ordersAPI.checkout();
    navigate('/orders');
  }
  async function handleAddToWishList(itemId) {
    const data = await wishAPI.addToWishlist(itemId)
    setWishlist(data)
  }
  async function handleRemoveFromWishList(itemId) {
    const data = await wishAPI.removeFromWishlist(itemId)
    setWishlist(data)
  }
  async function handleSelectItem(itemId, catName, depName) {
    navigate(`/home/${depName}/${catName}/${itemId}`)
  }

  const updateSearchResults = async (searchQuery) => {
    const items = await searchItems(searchQuery);
    setSearchResults(items);
  };
  return (
    <main className={styles.App}>
      {/* { user ? */}
      <>
        <NavBar
          user={user}
          setUser={setUser}
          cart={cart}
          handleChangeQty={handleChangeQty}
          handleRemoveFromWishList={handleRemoveFromWishList}
          handleCheckout={handleCheckout}
          wishlist={wishlist}
          departments={departments}
        />
        <Routes>
          {/* client-side route that renders the component instance if the path matches the url in the address bar */}
          <Route path="/home" element={<HomePage user={user} setUser={setUser} departments={departments} />} />
          <Route path="/cart" element={<OrderPage user={user} setUser={setUser} />} />
          <Route path="/orders" element={<OrderHistoryPage user={user} setUser={setUser} />} />
          <Route path="/faq" element={<FAQPage user={user} setUser={setUser} />} />
          <Route path="/profile" element={<UserProfilePage user={user} setUser={setUser} />} />
          <Route path="/wishlist"
            element={<WishlistPage
              user={user}
              setUser={setUser}
              handleAddToOrder={handleAddToOrder}
              handleRemoveFromWishList={handleRemoveFromWishList}
              handleSelectItem={handleSelectItem} 
            />}
          />
          <Route path="/aboutus" element={<AboutUsPage user={user} setUser={setUser} />} />
          <Route path="/auth" element={<AuthPage user={user} setUser={setUser} />} />
          <Route path="/home/search/:term" 
            element={<SearchResultsPage 
              user={user} 
              setUser={setUser} 
              handleAddToOrder={handleAddToOrder} 
              handleAddToWishList={handleAddToWishList} 
              handleSelectItem={handleSelectItem} 
              updateSearchResults={updateSearchResults} 
            />} 
          />
          <Route path="/home/:depName/categories" element={<CategoryListPage user={user} setUser={setUser} />} />
          <Route path="/home/:depName/:catName/items" 
            element={<ItemListPage 
              user={user} 
              setUser={setUser} 
              handleAddToOrder={handleAddToOrder} 
              handleAddToWishList={handleAddToWishList} 
              handleSelectItem={handleSelectItem} 
            />} 
          />
          <Route path="/home/:depName/:catName/:id" 
            element={<ItemDetailPage 
              user={user} 
              setUser={setUser} 
              handleAddToOrder={handleAddToOrder} 
              handleAddToWishList={handleAddToWishList} 
            />} 
          />

          <Route path="/*" element={<Navigate to="/home" />} />
        </Routes>
      </>
      {/* :
        <AuthPage setUser={setUser} /> */}
      {/* } */}
    </main>
  )
}
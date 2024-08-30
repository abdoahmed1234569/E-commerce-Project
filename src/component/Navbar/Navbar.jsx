import { useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { userContext } from "../../context/UserContext";
import { cartContext } from "../../context/CartContext";
import logo from "../../assets/freshcart-logo.svg"

export default function Navbar() {
  let {isLogin, setLogin} = useContext(userContext)
  let { cartNumber, getProductsFromCart } = useContext(cartContext);
  let navigate = useNavigate()
  const logOut = () => {
    localStorage.removeItem('userToken')
    setLogin(null)
    navigate('/login')
  }

  const getProduct = async () => {
    await getProductsFromCart()
  }

  useEffect(() => {
    getProduct()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <nav className="bg-slate-100 fixed w-full z-20 top-0 start-0 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="https://flowbite.com/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} className="h-8" alt="Flowbite Logo" />
          </a>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {!isLogin ? (
              <>
                <button
                  type="button"
                  className="text-white mr-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <NavLink to={"/register"}>Register</NavLink>
                </button>
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <NavLink to={"/login"}>Login</NavLink>
                </button>
              </>
            ) : (
              <>
                <span className="relative">
                  <span className="shrink-0 absolute top-[-10px] left-5 rounded-full bg-emerald-500 px-3 font-mono text-md font-medium tracking-tight text-white">
                    {cartNumber}
                  </span>
                  <i className="fa-solid fa-cart-shopping fa-2x fa-fw pr-14 text-gray-600"></i>
                </span>
                <button
                  onClick={logOut}
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  LogOut
                </button>
                <button
                  data-collapse-toggle="navbar-sticky"
                  type="button"
                  className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  aria-controls="navbar-sticky"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 17 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1h15M1 7h15M1 13h15"
                    />
                  </svg>
                </button>
              </>
            )}
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            {isLogin ? (
              <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
                <li>
                  <NavLink
                    to={"/"}
                    className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                    aria-current="page"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/brands"}
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Brands
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/carts"}
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Carts
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/category"}
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"wishList"}
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Wish List
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"allorders"}
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Orders
                  </NavLink>
                </li>
              </ul>
            ) : null}
          </div>
        </div>
      </nav>

      {/* <nav classNameName="bg-slate-300 shadow-sm p-4">
        <div classNameName="flex justify-between lg:items-center">
          <div classNameName="logo flex flex-col lg:flex-row">
            <img src={logo} alt="logo" width={200} classNameName="px-3" />
            {isLogin ? (
              <ul classNameName="flex flex-col lg:flex-row">
                <li classNameName="px-3 py-2">
                  <NavLink to={""}>Home</NavLink>
                </li>
                <li classNameName="px-3 py-2">
                  <NavLink to={"brands"}>Brands</NavLink>
                </li>
                <li classNameName="px-3 py-2 relative">
                  <span classNameName="shrink-0 absolute top-0 left-11 rounded-full bg-emerald-500 px-3 font-mono text-md font-medium tracking-tight text-white">
                    {cartNumber}
                  </span>
                  <NavLink to={"carts"}>Cart</NavLink>
                </li>
              </ul>
            ) : null}
          </div>
          <div classNameName="social">
            <ul classNameName="flex flex-col lg:flex-row">
              {!isLogin ? (
                <>
                  <li classNameName="px-2">
                    <NavLink to={"/register"}>Register</NavLink>
                  </li>
                  <li classNameName="px-2">
                    <NavLink to={"/login"}>Login</NavLink>
                  </li>
                </>
              ) : (
                <li classNameName="px-2 cursor-pointer">
                  <span onClick={logOut}>LogOut</span>
                </li>
              )}
              <li classNameName="px-2">
                <i classNameName="fab px-2 fa-facebook"></i>
                <i classNameName="fab px-2 fa-youtube"></i>
                <i classNameName="fab px-2 fa-instagram"></i>
              </li>
            </ul>
          </div>
        </div>
      </nav> */}
    </>
  );
}

import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import ChatBotWidget from './ChatBotWidget'

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <ChatBotWidget />
    </div>
  )
}

export default Layout







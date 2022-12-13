type LayoutProps = {
  children: React.ReactNode
}

function Layout({ children }: LayoutProps) {
  return (
    <div>
      {/* <h1>navbar</h1> */}
      {children}
      {/* <h1>footer</h1> */}
    </div>
  )
}

export default Layout

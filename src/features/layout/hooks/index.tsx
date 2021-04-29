// Context.js
import React from "react"

const defaultContextValue = {
  data: {
    // set your initial data shape here
    menuOpen: false,
  },
  set: () => {},
}

const { Provider, Consumer } = React.createContext(defaultContextValue)

const LayoutContextProvider = () => {
  const [ showNav, setShowNav ] = useState()
  setData(newData) {
    this.setState(state => ({
      data: {
        ...state.data,
        ...newData,
      },
    }))
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>
  }
}

export { Consumer as default, ContextProviderComponent }

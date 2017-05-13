'use strict'

import React, {PureComponent} from 'react'
import {Provider, connect} from 'react-redux'
import Favorite from './components/Favorite'
import Config from './components/Config'
import store from 'Redux/store'
import {connectToRedis} from 'Redux/actions'
import {removeFavorite, updateFavorite, addFavorite, reorderFavorites} from 'Redux/actions'

class ConnectionSelector extends PureComponent {
  constructor() {
    super()
    this.state = {connect: false, key: null}
  }

  handleSelectFavorite(connect, key) {
    this.setState({connect, key})
  }

  render() {
    const selectedFavorite = this.state.key && this.props.favorites.find(item => item.get('key') === this.state.key)
    return (<div className="pane-group">
      <aside className="pane pane-sm sidebar">
        <Favorite
          favorites={this.props.favorites}
          onSelect={this.handleSelectFavorite.bind(this, false)}
          onRequireConnecting={this.handleSelectFavorite.bind(this, true)}
          updateFavorite={this.props.updateFavorite}
          addFavorite={this.props.addFavorite}
          removeFavorite={this.props.removeFavorite}
          reorderFavorites={this.props.reorderFavorites}
          />
      </aside>
      <div className="pane">
        <Config
          favorite={selectedFavorite}
          connectStatus={this.props.connectStatus}
          connect={this.state.connect}
          connectToRedis={this.props.connectToRedis}
          onSave={data => {
            this.props.updateFavorite(selectedFavorite.get('key'), data)
          }}
          onDuplicate={addFavorite}
          />
      </div>
    </div>)
  }
}

function mapStateToProps(state, {instance}) {
  return {
    favorites: state.favorites,
    connectStatus: instance.get('connectStatus')
  }
}
const mapDispatchToProps = {
  updateFavorite,
  addFavorite,
  connectToRedis,
  reorderFavorites,
  removeFavorite
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectionSelector)
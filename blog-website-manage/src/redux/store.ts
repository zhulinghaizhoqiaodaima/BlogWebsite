import { configureStore } from '@reduxjs/toolkit'
import Collpsed from './reducers/CollapsedReducer'
import SpinReducer from './reducers/SpinReducer'

import { persistStore, persistReducer } from 'redux-persist' // 持久化工具库
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
const persistConfig = {
    key: 'Collpsed',
    storage, // 持久化存储到localstorage中
    // whitelist: ['navigation'] // only navigation will be persisted
}
// const reducers = {
//     Collpsed: Collpsed,
//     SpinReducer: SpinReducer
// }

const store = configureStore({
    reducer:  {
        Collpsed: persistReducer(persistConfig, Collpsed), // 数据持久化
        SpinReducer: SpinReducer
    },
})

let persistor = persistStore(store)

export  {
    store,
    persistor
}
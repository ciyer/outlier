import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { archiveApi } from "../features/archive/archive.api";
import { articleApi } from "../features/article/article.api";
import { controls } from "../features/controls/controls.slice";

export const store = configureStore({
  reducer: {
    [archiveApi.reducerPath]: archiveApi.reducer,
    [articleApi.reducerPath]: articleApi.reducer,
    controls: controls.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(archiveApi.middleware)
      .concat(articleApi.middleware),
  // Enable the RTK Query DevTools extension
  devTools: process.env.NODE_ENV !== "production",
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

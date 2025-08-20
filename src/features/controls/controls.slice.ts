import {
  AnyAction,
  PayloadAction,
  ThunkDispatch,
  createSlice,
} from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { RootState } from "../../app/store";


export enum Period {
  ALL = "all",
  CURRENT = "current",
  LAST_5_YEARS = "last_5_years",
}

export enum SortKind {
  CHRONOLOGICAL = "chronological",
  COUNT = "count",
}

export interface ArchiveControls {
  showImages: boolean;
  filters: {
    category: string[];
    experiment: string[];
    fabric: string[];
    text: string[];
    color: string[];
  };
  paging: {
    page: number;
    perPage: number;
  };
  period: Period;
  sorting: SortKind;
}

const initialState: ArchiveControls = {
  paging: { perPage: 10, page: 0 },
  showImages: true,
  filters: {
    category: [],
    experiment: [],
    fabric: [],
    text: [],
    color: [],
  },
  period: Period.CURRENT,
  sorting: SortKind.CHRONOLOGICAL,
};

export const controls = createSlice({
  name: "controls",
  initialState,
  reducers: {
    clearAllFilters: (state) => {
      state.filters.category = [];
      state.filters.fabric = [];
      state.filters.experiment = [];
      state.filters.text = [];
      state.filters.color = [];
    },
    setShowImages: (
      state,
      action: PayloadAction<Pick<ArchiveControls, "showImages">>
    ) => {
      state.showImages = action.payload["showImages"];
    },
    setPage: (
      state,
      { payload: { page } }: PayloadAction<{ page: number }>
    ) => {
      state.paging.page = page;
    },
    setPeriod: (
      state,
      { payload: { period } }: PayloadAction<{ period: Period }>
    ) => {
      state.period = period;
    },
    setCategoryFilter: (
      state,
      { payload: { category } }: PayloadAction<{ category: string[] }>
    ) => {
      state.filters.category = category;
    },
    setColorFilter: (
      state,
      { payload: { color } }: PayloadAction<{ color: string[] }>
    ) => {
      state.filters.color = color;
    },
    setSorting: (
      state,
      { payload: { sorting } }: PayloadAction<{ sorting: SortKind }>
    ) => {
      state.sorting = sorting;
    },
    setTextFilter: (
      state,
      { payload: { text } }: PayloadAction<{ text: string[] }>
    ) => {
      state.filters.text = text;
    },
    toggleCategoryFilter: (
      state,
      { payload: { category } }: PayloadAction<{ category: string }>
    ) => {
      const categories = state.filters.category;
      if (categories.includes(category)) {
        state.filters.category = categories.filter((c) => c !== category);
      } else {
        state.filters.category = [...categories, category];
      }
    },
    toggleColorFilter: (
      state,
      { payload: { color } }: PayloadAction<{ color: string }>
    ) => {
      const colors = state.filters.color;
      if (colors.includes(color)) {
        state.filters.color = colors.filter((c) => c !== color);
      } else {
        state.filters.color = [...colors, color];
      }
    },
    toggleFabricFilter: (
      state,
      { payload: { fabric } }: PayloadAction<{ fabric: string }>
    ) => {
      const fabrics = state.filters.fabric;
      if (fabrics.includes(fabric)) {
        state.filters.fabric = fabrics.filter((f) => f !== fabric);
      } else {
        state.filters.fabric = [...fabrics, fabric];
      }
    },
    toggleTextFilter: (
      state,
      { payload: { text } }: PayloadAction<{ text: string }>
    ) => {
      const texts = state.filters.text;
      if (texts.includes(text)) {
        state.filters.text = texts.filter((t) => t !== text);
      } else {
        state.filters.text = [...texts, text];
      }
    },
  },
});

export const {
  clearAllFilters,
  setColorFilter,
  setPage,
  setPeriod,
  setShowImages,
  setSorting,
  setTextFilter,
  toggleCategoryFilter,
  toggleColorFilter,
  toggleFabricFilter,
  toggleTextFilter,
} = controls.actions;

export type ArchiveControlsStateDispatch = Dispatch<AnyAction> &
  ThunkDispatch<RootState, null, AnyAction>;

export const useControlsStateDispatch = () =>
  useDispatch<ArchiveControlsStateDispatch>();
export const useControlsStateSelector: TypedUseSelectorHook<RootState> =
  useSelector;

export default controls.reducer;

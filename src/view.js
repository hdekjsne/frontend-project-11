import { state } from './state.js';
import onChange from 'on-change';

const { input, submitBtn, feedbackP } = state.elements.core;

export const watchedState = onChange(state, () => {});

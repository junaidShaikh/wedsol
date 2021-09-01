import { proxy } from 'valtio';

interface State {}

const state = proxy<State>({});

export { state };

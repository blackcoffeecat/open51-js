import StatePublisher from '@open51/utils/StatePublisher';
import { useState } from 'react';
import useMountEffect from './useMountEffect';

function usePublisherValue<T>(publisher: StatePublisher<T>): T {
  const [state, setState] = useState(publisher.state);

  useMountEffect(publisher.subscribe, setState);

  return state;
}

export default usePublisherValue;

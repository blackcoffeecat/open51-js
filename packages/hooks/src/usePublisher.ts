import StatePublisher, { IsEqualState, StatePublisherMode } from '@open51/utils/StatePublisher';
import { useEffect, useMemo } from 'react';
import useCall from './useCall';

function usePublisher<T = any>(isEqualState?: IsEqualState<T>, mode?: StatePublisherMode): StatePublisher {
  const isEqualStateCall = useCall(isEqualState ?? (() => false));
  const publisher = useMemo(() => new StatePublisher(isEqualStateCall, mode), []);

  useEffect(() => {
    publisher.mode = mode;
  }, [mode]);

  return publisher;
}

export default usePublisher;

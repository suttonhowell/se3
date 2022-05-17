import { FC, ReactElement } from 'react';

interface ConditionalWrapperProps {
  children: ReactElement;
  condition: boolean;
  wrapper: (children: ReactElement) => JSX.Element;
}

export const ConditionalWrapper: FC<ConditionalWrapperProps> = ({ condition, wrapper, children }) =>
  condition ? wrapper(children) : children;

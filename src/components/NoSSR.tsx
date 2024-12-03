import React, { type PropsWithChildren } from 'react';
import dynamic from 'next/dynamic';

const NoSsr = (props: PropsWithChildren) => (
  <React.Fragment>{props.children}</React.Fragment>
);

export default dynamic(() => Promise.resolve(NoSsr), {
  ssr: false,
});

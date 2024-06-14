import React, { type ElementProps } from 'react';
import classnames from 'classnames';
import './container.scss';

function Container({ className, ...rest }: ElementProps<'div'>) {
    return <div className={classnames('container', className)} {...rest} />;
}

export default Container;

import React from 'react';
import classnames from 'classnames';
import './container.scss';

function Container({
    className,
    ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={classnames('container', className)} {...rest} />;
}

export default Container;

import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './spiner.scss';

const antIcon = <LoadingOutlined style={{ fontSize: 160 }} spin />;

export const Spiner = () => <Spin className="spinner" indicator={antIcon} />;
// ReactDOM.render(<Spin indicator={antIcon} />, mountNode);

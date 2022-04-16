import React from 'react';
import { Pagination } from 'antd';
import './pagination.scss';

const Paginations = (props) => {
  const { countPage, getPage, page } = props;
  return (
    <Pagination
      className="pagination"
      onChange={getPage}
      total={countPage ? (countPage / 5) * 10 : null}
      showSizeChanger={false}
      current={page}
    />
  );
};
export default Paginations;

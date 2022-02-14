import React, { FC, useEffect, useState } from 'react';
import { BaseProps } from '~components/interface/base-props';
import { transI18n } from '~components/i18n';
import { useUIStore } from '@/infra/hooks';
import { Button } from '~components/button';
import dayjs from 'dayjs';
import './index.css';
import { observer } from 'mobx-react';

export interface GoodsItemProps extends BaseProps{}

export const GoodsItem: FC<GoodsItemProps> = ({ ...props }) => {
	const {
		goodsId,
		goodsName,
		goodsSrcUrl,
		goodsPrice,
		goodsUrl,
		goodsContent,
		goodsCurrency,
	} = props;
	
	const { language } = useUIStore();
	
	const handleShow = () =>{
		console.log('111');
	}
	
	const handleBuy = () =>{
		window.open(goodsUrl);
	}
	
    return (
      <div className="goods-message">
		<div className="goods-countent-left">
			<img className="goods-src" src={goodsSrcUrl} alt="" />
		</div>
		<div className="goods-countent-right">
			<span className="goods-item-header">{goodsName}</span>
			<span className="goods-item-content">{goodsContent}</span>
			<span className="goods-item-price">{transI18n('goods.price')}:{goodsCurrency}{goodsPrice}</span>
			<span className="goods-item-butten">
			<Button
			  disabled={false}
			  onClick={handleBuy}
			  className="goods-item-price-butten">
			  {transI18n('goods.buy')}
			</Button>
			</span>
		</div>
      </div>
    );
  };

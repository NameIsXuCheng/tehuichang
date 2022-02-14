import React, { FC, useState, useRef, useEffect, useMemo } from 'react';
import { BaseProps } from '~components/interface/base-props';
import { GoodsItem } from './item';
import { Placeholder } from '~components/placeholder';
import { Button } from '~components/button';
import { useMessagesContext, ChatMessage } from 'agora-meeting-core';
import { observer } from 'mobx-react';
import { useUIStore } from '@/infra/hooks';
import './index.css';
import dayjs from 'dayjs';
import { transI18n } from '~ui-kit';

const SECONDS_GAP = 60 * 2;

export interface GoodsProps extends BaseProps {}

export const MettingGoods: FC<GoodsProps> = observer(() => {
  const { language, setGoodsVisible } = useUIStore();
  const [chatText, setChatText] = useState('');
  const [focused, setFocused] = useState<boolean>(false);
  const handleFocus = () => setFocused(true);
  const handleBlur = () => {
    if (!!chatText) {
      return;
    }
    setFocused(false);
  };

  const chatHistoryRef = useRef<HTMLDivElement | null>(null);
  const currentHeight = useRef<number>(0);
  const scrollDirection = useRef<string>('bottom');

  const handleScrollDown = (current: HTMLDivElement) => {
    current.scrollTop = current.scrollHeight;
  };

  const onPullFresh = () => {};

  const handleScroll = (event: any) => {
    const { target } = event;
    if (target?.scrollTop === 0) {
      onPullFresh && onPullFresh();
      currentHeight.current = target.scrollHeight;
      scrollDirection.current = 'top';
    }
  };

  const handleKeypress = async (
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (event.key === 'Enter') {
      if (event.ctrlKey) {
        event.currentTarget.value += '\n';
      } else if (!event.shiftKey && !event.altKey) {
        // send message if enter is hit
        event.preventDefault();
        await handleSend();
      }
    }
  };

  const onClose = () => {
    setGoodsVisible(false);
  };
  
  const goodsList = [
	  {
		"goodsId":"280",
		"goodsName":"穆杰罗芦荟身体霜300ml",
		"goodsSrcUrl":"http://t-cang.oss-cn-beijing.aliyuncs.com/saas/mttshop/M29WK5XOWO7ZJWFBW8YH.png",
		"goodsPrice":"6",
		"goodsUrl":"http://www.mttlm.com/index/product/view/id/280.html",
		"goodsContent":"这个产品是测试显示的",
		"goodsCurrency":"￥",
	  },
	  {
	  	"goodsId":"281",
	  	"goodsName":"穆杰罗芦荟皂液 300ml",
	  	"goodsSrcUrl":"http://t-cang.oss-cn-beijing.aliyuncs.com/saas/mttshop/016F6MNXRAR2AXOFZOMO.png",
	  	"goodsPrice":"6",
	  	"goodsUrl":"http://www.mttlm.com/index/product/view/id/281.html",
	  	"goodsContent":"这个产品是测试显示的",
	  	"goodsCurrency":"￥",
	  },
	  {
	  	"goodsId":"282",
		"goodsName":"穆杰罗柑橘皂液500ml",
		"goodsSrcUrl":"http://t-cang.oss-cn-beijing.aliyuncs.com/saas/mttshop/G6SPD9UQCGPKMT52DXCF.png",
		"goodsPrice":"6",
		"goodsUrl":"http://www.mttlm.com/index/product/view/id/282.html",
		"goodsContent":"这个产品是测试显示的",
		"goodsCurrency":"￥",
	  },
	];
  
  useEffect(() => {
    if (scrollDirection.current === 'bottom') {
      chatHistoryRef.current && handleScrollDown(chatHistoryRef.current);
    }
    if (scrollDirection.current === 'top' && chatHistoryRef.current) {
      const position =
        chatHistoryRef?.current.scrollHeight - currentHeight.current;
      chatHistoryRef.current.scrollTo(0, position);
    }
  }, [chatHistoryRef, scrollDirection]);

  return (
    <div className="metting-goods">
      <div className="goods-header">
        <span className="goods-header-title">{transI18n('main.goods')}</span>
        <i className="icon icon-close" onClick={(e) => onClose()}></i>
      </div>
	  {goodsList.map((item, index) => (
	    <GoodsItem {...item} key={item.goodsId}></GoodsItem>
	  ))}
    </div>
  );
});

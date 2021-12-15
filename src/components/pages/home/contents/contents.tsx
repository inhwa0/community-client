import { css } from '@emotion/react';

import React, { useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { Content } from '../../../../stores/home/home.model';
import {
  card, cardsItem, container, img, imgWrapper, wrapper,
} from '../../../../styles/emotion/card.style';
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver';

interface Props {
  posts: Content[] | undefined;
  page: number;
  setPage: (value: number) => void;
  setLastScrollY: (value: number) => void;
}

const Contents = ({
  posts,
  page,
  setPage,
  setLastScrollY,
}: Props) => {
  const router = useRouter();
  const ref = useRef(null);
  const isBottomVisible = useIntersectionObserver(
    ref,
    {
      threshold: 0, // trigger event as soon as the element is in the viewport.
    },
    false, // don't remove the observer after intersected.
  );

  useEffect(() => {
    if (!isBottomVisible) {
      return;
    }
    // console.log('끝 :::', isBottomVisible);

    if (window.scrollY < 2000 && page > 5) {
      return;
    }

    setLastScrollY(window.scrollY);
    setPage(page + 1);
  }, [isBottomVisible]);

  const onClickLink = useCallback(async (id) => {
    setLastScrollY(window.scrollY);
    await router.push(`/${id}`);
  }, []);

  return (
    <>
      <div css={container}>
        <div css={wrapper}>
          {posts?.map((content: Content) => (
            <div
              key={content?.id}
              css={[cardsItem, css``]}
            >
              <div css={[card, css``]}>
                <div
                  css={imgWrapper}
                  onClick={() => onClickLink(content?.id)}
                >
                  {/* <Image src={value?.contentURL} /> */}
                  <img
                    src={content?.files[0]?.filePath}
                    // src="https://picsum.photos/500/300/?image=11"
                    alt={content?.title}
                    css={img}
                  />
                </div>
                <div css={[css`
                  border-top: 1px solid rgb(226, 226, 226);
                `]}
                >
                  <div onClick={() => onClickLink(content?.id)}>
                    <h4
                      css={[css`
                        padding: 0.5rem;
                        white-space: initial;
                        cursor: pointer;
                      `]}
                    >
                      {content?.title}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div ref={ref} />
        </div>
      </div>
    </>
  );
};

// Props 바뀌지 않으면 리렌더링을 하지 않음
export default React.memo(Contents);

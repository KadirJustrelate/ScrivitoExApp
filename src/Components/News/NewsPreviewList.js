import { groupBy } from 'lodash-es';
import * as React from 'react';
import * as Scrivito from 'scrivito';
import formatDate from '../../utils/formatDate';
import InPlaceEditingPlaceholder from "../InPlaceEditingPlaceholder";

const NewsPreviewList = Scrivito.connect(({ maxItems }) => {

    let newsList = Scrivito.getClass('News')
        .all()
    
    if (maxItems) {
        newsList = newsList.take(maxItems)
    }    

    let news = [...newsList]

    const months = groupBy(news, (post) => {
        const publishedAt = post.get("publishDate");
        return publishedAt && formatDate(publishedAt, "mmmm yyyy");
    });

    if (!news.length) {
        return (
          <InPlaceEditingPlaceholder center>
            There are no news. Create one using the page menu.
          </InPlaceEditingPlaceholder>
        );
      }

    return (
        <React.Fragment>
            {Object.entries(months).map(([newsItem, news]) => (
                <React.Fragment key={newsItem}>
                    <NewsPreview news={news} />
                </React.Fragment>
            ))
            }
        </React.Fragment>
    );
})

const NewsPreview = Scrivito.connect(({ news }) => (
    <div>
        <div className="news">
            <div className="container">
                <div className="row d-flex justify-content-around flex-wrap">
                    {news.map((item, ind) => (
                        <div  key={ind}>
                            <div>
                                {item.get('title')}
                            </div>

                            <div className="m-2 p-2">
                                <Scrivito.LinkTag to={item} className='btn'>
                                    Read
                                </Scrivito.LinkTag>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
))

export default NewsPreviewList;
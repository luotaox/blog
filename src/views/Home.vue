<template>
    <div class="home">
        <banner isHome="true"></banner>
        <div class="site-content animate">
            <!--通知栏-->
            <div class="notify">
                <div class="search-result" v-if="hideSlogan">
                    <span v-if="searchWords">搜索结果："{{ searchWords }}" 相关文章</span>
                    <span v-else-if="category">分类 "{{ category }}" 相关文章</span>
                </div>
                <quote v-else>{{ this.$store.state.notice.notice }}</quote>
            </div>

            <!--焦点图-->
            <div class="top-feature" v-if="!hideSlogan">
                <section-title>
                    <div style="display: flex;align-items: flex-end;">聚焦<small-ico></small-ico></div>
                </section-title>
                <div class="feature-content">
                    <div class="feature-item" v-for="item in features" :key="item.title">
                        <Feature :data="item"></Feature>
                    </div>
                </div>
            </div>
            <!--文章列表-->
            <main class="site-main" :class="{ 'search': hideSlogan }">
                <section-title v-if="!hideSlogan">推荐</section-title>
                <template v-for="item in postList">
                    <post :post="item"></post>
                </template>
            </main>

            <!--加载更多-->
            <div class="more" v-show="hasNextPage">
                <div class="more-btn" @click="loadMore">More</div>
            </div>
        </div>
    </div>
</template>

<script>
import Banner from '@/components/banner'
import Feature from '@/components/feature'
import sectionTitle from '@/components/section-title'
import Post from '@/components/post'
import SmallIco from '@/components/small-ico'
import Quote from '@/components/quote'
import axios from 'axios'

export default {
    name: 'Home',
    props: ['cate', 'words'],
    data() {
        return {
            features: [],
            postList: [],
            currPage: 1,
            hasNextPage: false,
        }
    },
    components: {
        Banner,
        Feature,
        sectionTitle,
        Post,
        SmallIco,
        Quote
    },
    computed: {
        searchWords() {
            return this.$route.params.words
        },
        category() {
            return this.$route.query.title
        },
        hideSlogan() {
            if (this.category) {
                this.getCateList();
                return true;
            } else if (this.searchWords) {
                this.postList = this.$route.params.list;
                return true;
            } else {
                this.fetchList();
                return false
            }
        },

    },
    methods: {
        getCateList() {
            this.currPage = 1;
            axios.post('/webapi/post/list/cate', {
                category: `/category/${this.$route.params.cate}`
            }).then(res => {
                this.postList = res.data.data;
            }).catch(err => {
                console.log(err)
            });
        },
        fetchFocus() {
            axios.get('/webapi/focus/list').then(res => {
                this.features = res.data.data || []
            }).catch(err => {
                console.log(err)
            });
        },
        fetchList() {
            axios.post('/webapi/post/list').then(res => {
                this.postList = res.data.data.items || []
                this.currPage = res.data.data.page
                this.hasNextPage = res.data.data.hasNextPage
            }).catch(err => {
                console.log(err)
            });

        },
        loadMore() {
            axios.post('/webapi/post/list', {
                page: this.currPage + 1,
                category: this.$route.params.cate
            }).then(res => {
                this.postList = res.data.data.items || []
                this.currPage = res.data.data.page
                this.hasNextPage = res.data.data.hasNextPage
            });
        },
        notice() {
            axios.get('/webapi/notice').then((res) => {
                this.$store.commit('changeNotice', res.data.data[0])
            })
        },

    },
    mounted() {
        this.fetchFocus();
        this.fetchList();
        this.notice();
    }
}
</script>
<style scoped lang="less">
.site-content {
    .notify {
        margin: 60px 0;
        border-radius: 3px;

        &>div {
            padding: 20px;
        }
    }


    .search-result {
        padding: 15px 20px;
        text-align: center;
        font-size: 20px;
        font-weight: 400;
        border: 1px dashed #ddd;
        color: #828282;
    }
}

.top-feature {
    width: 100%;
    height: auto;
    margin-top: 30px;

    .feature-content {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        position: relative;

        .feature-item {
            width: 32.9%;
        }
    }
}

.site-main {
    padding-top: 80px;

    &.search {
        padding-top: 0;
    }
}

.more {
    margin: 50px 0;

    .more-btn {
        width: 100px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #ADADAD;
        border: 1px solid #ADADAD;
        border-radius: 20px;
        margin: 0 auto;
        cursor: pointer;

        &:hover {
            color: #8fd0cc;
            border: 1px dashed #8fd0cc;
        }
    }
}

/******/
@media (max-width: 800px) {
    .top-feature {
        display: none;
    }

    .site-main {
        padding-top: 40px;
    }

    .site-content {
        .notify {
            margin: 30px 0 0 0;
        }

        .search-result {
            margin-bottom: 20px;
            font-size: 16px;
        }
    }
}

/******/
</style>

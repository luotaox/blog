<template>
    <div id="layout-footer">
        <div class="footer-main">
            <div class="footer-item" v-if="socials.length">
                <div v-for="item in socials" :key="item.id"><a target="_blank" class="out-link" :href="item.href"><i
                            class="iconfont" :class="item.icon"></i>{{ item.title }}</a></div>
            </div>
            <div class="footer-item">
                <div style="font-size:17px;font-weight: bold;">资源</div>
                <div v-for="item in footer" :key="item._id">
                    <a target="_blank" class="out-link" :href="item.href">{{ item.title }}</a>
                </div>
            </div>
            <div class="footer-item">
                <div>本站已运行 {{ runTimeInterval }}</div>
                <div><a target="_blank" class="out-link" href="http://8.130.52.196:2000">☞后台管理</a></div>
            </div>
        </div>
        <div class="copyright">最终解释权归本站所有
            <span style="color: rgb(40, 118, 167);margin-left: 1rem; cursor: pointer">@多次拒绝李知恩</span>
        </div>
    </div>
</template>

<script>
import sectionTitle from '@/components/section-title'
import axios from 'axios'
export default {
    name: "layout-footer",
    data() {
        return {
            socials: [],
            footer: []
        }
    },
    components: {
        sectionTitle
    },
    computed: {
        runTimeInterval() {
            return this.$store.state.runTimeInterval;
        }
    },
    methods: {
        getSocial() {
            this.$store.dispatch('getSocials').then(data => {
                this.socials = data
            })
        },
        getFooter() {
            axios.get('/webapi/footer').then((res) => {
                this.footer = res.data.data
            })
        }
    },
    created() {
        this.getSocial();
        this.$store.dispatch('initComputeTime');
        this.getFooter();
    }
}
</script>

<style scoped lang="less">
#layout-footer {
    padding: 2%;
    border-top: 1px solid #F7F7F7;
    font-size: 13px;
    color: #9c9c9c;

    a.out-link:hover {
        color: #ff6d6d;
    }

    .footer-main {
        max-width: 800px;
        margin: 0 auto 20px auto;
        display: flex;
        justify-content: space-around;
        align-items: flex-start;

        .footer-item {
            flex: 1;

            &>div:not(:last-child) {
                margin-bottom: 10px;
            }

            i {
                margin-right: 10px;
            }
        }
    }

    .copyright {
        text-align: center;
    }
}

/*****/
@media (max-width: 800px) {
    #layout-footer {
        .footer-main .footer-item:nth-child(3) {
            flex: 2;
        }
    }
}

@media (max-width: 600px) {
    #layout-footer {
        .footer-main {
            display: block;

            .footer-item {
                display: flex;
                justify-content: space-around;
                align-items: center;
                flex-wrap: wrap;

                &>div {
                    margin-bottom: 10px;
                }
            }
        }
    }
}

/*****/
</style>
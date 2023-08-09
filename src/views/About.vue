<template>
    <div class="about">
        <div class="site-content">
            <div class="content-warp">
                <div class="about-site about-info">
                    <section-title><span>❤</span>关于博客</section-title>
                    <div class="info-card">
                        {{ this.$store.state.notice.content }}
                    </div>
                </div>
                <div class="about-me about-info">
                    <section-title id="Guestbook"><span>❤</span>更多</section-title>
                    <span style="margin: 1em 0;">three小案例 试着一下拖动吧~~</span>
                    <div id="container"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import sectionTitle from '@/components/section-title'
import * as three from 'three'
import model from '@/utils/model'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
export default {
    name: "About",
    data() {
        return {
            camera: null,
            scene: null,
            renderer: null,
            mesh: null
        }
    },
    components: {
        sectionTitle
    },
    methods: {
        init: function () {
            const container = document.getElementById("container");
            // 设置相机
            this.camera = new three.PerspectiveCamera(58, window.innerWidth / window.innerHeight, 0.01, 1000)
            this.camera.position.set(-8, -8, 20);
            // 初始化场景
            this.scene = new three.Scene()
            // 初始化物体
            model.position.y = -95;
            this.scene.add(model)
            // 初始化渲染器
            this.renderer = new three.WebGLRenderer({ antialias: true })
            this.renderer.setSize(container.clientWidth, container.clientHeight)
            this.renderer.setClearColor(0xffF0F8FF, 1);
            container.appendChild(this.renderer.domElement);
            // 轨道控制器
            const controls = new OrbitControls(this.camera, container);
            // 增加阻尼效果
            controls.enableDamping = true;
            controls.maxDistance = 128;
            controls.minDistance = 10;

            controls.minPolarAngle = 0;
            controls.maxPolarAngle = 100 / 360 * 2 * Math.PI;
        },
        animate: function () {
            requestAnimationFrame(this.animate)
            this.renderer.render(this.scene, this.camera)
        }
    },
    mounted() {
        this.init()
        this.animate()
    }
}
</script>
<style scoped lang="less">
#container {
    margin: 4em 0;
    width: 100%;
    height: 50vh;
}

.about {
    padding-top: 40px;
}

.content-warp {
    margin-top: 80px;

    .about-info {
        margin: 30px 0;

        span {
            color: red;
            margin-right: 10px;
        }

        .info-card {
            min-height: 100px;
            padding: 20px;
            border-radius: 3px;
            margin: 30px 0 50px 0;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

            p {
                line-height: 1.7rem;
            }
        }
    }

    .contactForm {
        width: 100%;
        padding: 20px;

        .form-item {
            align-items: center;
            display: flex;

            &:not(:last-child) {
                margin-bottom: 20px;
            }

            label {
                width: 80px;
            }

            .v {
                min-height: 40px;
                line-height: 20px;
                border-radius: 3px;
                padding: 2px 10px;
                outline: none;
                border: 1px solid #8fd0cc;
                width: 100%;
                resize: vertical;
            }

            button {
                width: 100px;
                height: 40px;
                border-radius: 3px;
                outline: 0;
                border-style: none;
                cursor: pointer;
                background-color: #409eff;
                color: white;

                &:hover {
                    opacity: 0.8;
                }
            }
        }
    }
}

/*******/
@media (max-width: 800px) {
    .content-warp {
        margin-top: 0;
    }
}
</style>

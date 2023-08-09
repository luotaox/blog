<template>
    <div class="feature">
        <router-link :to="`${data.href}/?title=${data.title}`">
            <div class="feature-title"><span class="foverlay">{{ data.title }}</span></div>
            <img :src="'http://8.130.52.196:3000' + data.img">
        </router-link>
    </div>
</template>

<script>
export default {
    name: "feature",
    props: {
        data: {
        }
    }
}
</script>

<style scoped lang="less">
.feature {
    width: inherit;
    position: relative;

    img {
        height: 160px;
        width: 257px;
        object-fit: cover;
        border-radius: 5px;
    }

    & a:hover .foverlay {
        opacity: 1;
    }

    .foverlay {
        position: absolute;
        z-index: 2;
        width: 257px;
        height: 160px;
        text-align: center;
        line-height: 160px;
        background: #BBE2DB;
        color: white;
        font-size: 16px;
        opacity: 0;
        border-radius: 5px;

        -moz-transition: opacity .4s ease-out;
        -o-transition: opacity .4s ease-out;
        -webkit-transition: opacity .4s ease-out;
        transition: opacity .4s ease-out;
    }
}
</style>
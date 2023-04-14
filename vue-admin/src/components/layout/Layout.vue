<template>
    <el-container style="height: 100%">
        <el-aside class="app-aside">
            <Aside/>
        </el-aside>
        <el-container>
            <el-header shadow="always" class="app-header">
                <Header/>
            </el-header>
            <el-main style="padding: 20px 20px 100px;" class="app-main">
                <div class="content" >
                    <router-view/>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import Header from "@/components/layout/Header";
    import Aside from "@/components/layout/Aside";

    export default {
        name: "Layout",
        components: {
            Header,
            Aside
        },
    }
</script>

<style scoped>
    .app-aside {
        width: 250px !important;
        background: #242930;
        height: 100%;
    }

    .app-main {
        background: #f5f6f7;
        height: 100%;
    }

    .app-header {
        height: 60px !important;
    }

    .content {
        background: #FFFFFF;
    }

</style>

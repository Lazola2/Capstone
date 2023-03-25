<template>
    <section class="about-section text-white pt-3">
       <div class="top-content  d-flex justify-content-center py-3 px-5 d-flex">
            <div class="content-side  p-5">
                <h1 class="heading mb-4 text-center mt-3">About Course It!</h1>
                <p class="paragraph text-center">
                    We provide the best courses you can ever think of. <br> 
                    <router-link to="/account" class="text-white">Login</router-link> and have an amazing experience.
                </p> 
            </div>
       </div>
       <div class="bottom-content text-white d-flex flex-column gap-2 pe-4">
        <ul class="d-flex justify-content-around">
            <li class="bottom-items">
                <div class="img">
                    <img src="https://i.postimg.cc/vmq0XYrj/coding.jpg" alt="coding-logo">
                </div>
                <h6>Coding</h6>
                <p class="item-paragraph">Beginner to advanced courses in various programming languages.</p>
            </li>
            <li class="bottom-items">
                <div class="img"><img src="https://i.postimg.cc/wvFgwsfz/uiux.jpg" alt="ui-ux logo"></div>
                <h6>UI/UX</h6>
                <p class="item-paragraph">Beginner to advanced UI/UX in Figma and PhotoShop</p>
            </li>
            <li class="bottom-items">
                <div class="img">
                    <img src="https://i.postimg.cc/QdXLyM7x/trading-log.jpg" alt="trading logo">
                </div>
                <h6>Trading</h6>
                <p class="item-paragraph">
                    We provide courses for Fundamental and Technical Analysis with Risk Management.
                </p>
            </li>
            <li class="bottom-items">
                <div class="img">
                    <img src="https://i.postimg.cc/1zfjkV3P/marketing.png" alt="marketing logo">
                </div>
                <h6>Marketing</h6>
                <p class="item-paragraph">
                    Take your business from Zero to Hero with a variety of our Marketing courses. 
                </p>
            </li>
        </ul>
       </div>
    </section>
</template>
<script>
export default {
    name: 'AboutView'
}
</script>
<style scoped>
    .about-section {
        display: flex;
        flex-direction: column;
        height: 91vh;
        background:
            linear-gradient(rgba(0,0,0,.9), rgba(0, 0, 0, 0.9)), 
            url(https://i.postimg.cc/mgHPr8D5/ecommerce-course-kbs.jpg);
        background-repeat: no-repeat;
        background-size: cover;
        object-fit: cover;
    }

    .top-content {
        text-align: center;
        display: flex;
    }

    .bottom-content {
        height: 55%;
    }

    .picture img {
        object-fit: cover;
        background-size: cover;
    }

    .bottom-items{
        width: 20%;
        height: 200px;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: white;
        color: black;
    }

    .img {
        height: 50px;
        position: relative;
        top: 0;
        width: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        border: 1px solid black;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }

    .img > img {
        height: 100%;
        width: 100%;
        height: 95%;
        width: 95%;
        border-radius: 50%;
    }

    .item-paragraph {
        font-size: 12px;
        text-align: center;
        padding: 0 2rem;
        margin-top: .5rem;
    }

    @media screen and (max-width: 800px) {

        .bottom-content ul {
            flex-wrap: wrap !important;
            overflow-y: auto;
        }

        .bottom-items {
            width: 45%;
            margin-bottom: 2rem;
        }
    }

    @media screen and (max-width: 500px) {
        .content-side {
            padding: 3rem 0 !important;
        }

        .bottom-content {
            margin-bottom: 2rem;
            padding-bottom: 2rem;
        }

        .bottom-items {
            width: 100%;
            margin-bottom: 2rem !important;
        }
    }
</style>
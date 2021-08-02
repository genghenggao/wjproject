<template>
    <div>
        {{currentPage}} / {{pageCount}}
        <pdf
            src="../assets/test.pdf"
            @num-pages="pageCount = $event"
            @page-loaded="currentPage = $event"
        ></pdf>
    </div>
</template>

<script>

import pdf from '@jbtje/vue3pdf'

export default {
    components: {
        pdf
    },
    data() {
        return {
            currentPage: 0,
            pageCount: 0,
        }
    }
}

</script>

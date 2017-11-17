<template>
    <div>
        <fieldset>
            <legend>Component</legend>
        </fieldset>
        <input type="text" name="name" value="" />
    </div>
</template>
<script>
    import Vue from 'vue';
    export default {
        name: 'form-comp',
        props: ["name"]
    }
</script>
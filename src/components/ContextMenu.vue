<template>
    <div v-contextmenu="showContextMenu">
        Right-click me
        <div v-show="isContextMenuVisible" class="custom-menu"
            :style="{ top: contextMenuPosition.y + 'px', left: contextMenuPosition.x + 'px' }">
            <div @click="handleMenuOption('Option 1')">Option 1</div>
            <div @click="handleMenuOption('Option 2')">Option 2</div>
            <div @click="handleMenuOption('Option 3')">Option 3</div>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            isContextMenuVisible: false,
            contextMenuPosition: { x: 0, y: 0 }
        };
    },
    methods: {
        showContextMenu(event) {
            event.preventDefault();
            this.isContextMenuVisible = true;
            this.contextMenuPosition = { x: event.pageX, y: event.pageY };
        },
        handleMenuOption(option) {
            alert('Selected option: ' + option);
            this.isContextMenuVisible = false;
        }
    }
};
</script>
  
<style>
.custom-menu {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    border: 1px solid #ccc;
    padding: 8px;
    min-width: 120px;
}
</style>
  
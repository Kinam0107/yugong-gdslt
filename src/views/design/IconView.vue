<template>
  <div class="icon_view">
    <div class="design_title">使用场景</div>
    <div class="design_description">一般用于网页各类型内容示意。</div>
    <div class="design_title">基本用法（点击图标可复制组件代码）</div>
    <div class="design_icon_box">
      <SvgIcon icon="arrow" @click="copy" />
      <SvgIcon icon="edit" @click="copy" />
    </div>
    <div class="design_icon_box">
      <SvgIcon icon="mail" @click="copy" />
      <SvgIcon icon="time-circle" @click="copy" />
      <SvgIcon icon="trash-can" @click="copy" />
      <SvgIcon icon="app-store" @click="copy" />
      <SvgIcon icon="trumpet" @click="copy" />
      <SvgIcon icon="horn" @click="copy" />
      <SvgIcon icon="sad" @click="copy" />
      <SvgIcon icon="calm" @click="copy" />
      <SvgIcon icon="happy" @click="copy" />
      <SvgIcon icon="male" @click="copy" />
      <SvgIcon icon="female" @click="copy" />
      <SvgIcon icon="compass" @click="copy" />
      <SvgIcon icon="sight-bead" @click="copy" />
    </div>
    <div class="design_icon_box">
      <SvgIcon icon="mail-fill" @click="copy" />
      <SvgIcon icon="time-circle-fill" @click="copy" />
      <SvgIcon icon="trash-can-fill" @click="copy" />
      <SvgIcon icon="app-store-fill" @click="copy" />
      <SvgIcon icon="trumpet-fill" @click="copy" />
      <SvgIcon icon="horn-fill" @click="copy" />
      <SvgIcon icon="sad-fill" @click="copy" />
      <SvgIcon icon="calm-fill" @click="copy" />
      <SvgIcon icon="happy-fill" @click="copy" />
    </div>
    <div class="design_icon_box">
      <SvgIcon icon="picture" @click="copy" />
      <SvgIcon icon="plus-circle" @click="copy" />
      <SvgIcon icon="calling-card" @click="copy" />
      <SvgIcon icon="document-box" @click="copy" />
      <SvgIcon icon="file-pocket" @click="copy" />
      <SvgIcon icon="schedule" @click="copy" />
      <SvgIcon icon="schedule-check" @click="copy" />
      <SvgIcon icon="schedule-multiple-check" @click="copy" />
      <SvgIcon icon="schedule-person" @click="copy" />
      <SvgIcon icon="schedule-money" @click="copy" />
      <SvgIcon icon="notebook" @click="copy" />
      <SvgIcon icon="paper" @click="copy" />
      <SvgIcon icon="document-shelf" @click="copy" />
      <SvgIcon icon="bookshelf" @click="copy" />
      <SvgIcon icon="book-open" @click="copy" />
      <SvgIcon icon="tag" @click="copy" />
      <SvgIcon icon="tags" @click="copy" />
      <SvgIcon icon="detach" @click="copy" />
      <SvgIcon icon="pause" @click="copy" />
    </div>
    <div class="design_icon_box">
      <SvgIcon icon="picture-fill" @click="copy" />
      <SvgIcon icon="plus-circle-fill" @click="copy" />
      <SvgIcon icon="calling-card-fill" @click="copy" />
      <SvgIcon icon="document-box-fill" @click="copy" />
      <SvgIcon icon="file-pocket-fill" @click="copy" />
      <SvgIcon icon="schedule-fill" @click="copy" />
      <SvgIcon icon="schedule-check-fill" @click="copy" />
      <SvgIcon icon="schedule-multiple-check-fill" @click="copy" />
      <SvgIcon icon="schedule-person-fill" @click="copy" />
      <SvgIcon icon="schedule-money-fill" @click="copy" />
      <SvgIcon icon="notebook-fill" @click="copy" />
      <SvgIcon icon="paper-fill" @click="copy" />
      <SvgIcon icon="document-shelf-fill" @click="copy" />
      <SvgIcon icon="bookshelf-fill" @click="copy" />
      <SvgIcon icon="book-open-fill" @click="copy" />
      <SvgIcon icon="tag-fill" @click="copy" />
      <SvgIcon icon="tags-fill" @click="copy" />
      <SvgIcon icon="detach-fill" @click="copy" />
      <SvgIcon icon="pause-fill" @click="copy" />
    </div>
    <div class="design_icon_box">
      <SvgIcon icon="user" @click="copy" />
      <SvgIcon icon="user-batch" @click="copy" />
      <SvgIcon icon="user-switch" @click="copy" />
      <SvgIcon icon="user-add" @click="copy" />
      <SvgIcon icon="user-remove" @click="copy" />
      <SvgIcon icon="user-batch-add" @click="copy" />
      <SvgIcon icon="user-batch-remove" @click="copy" />
      <SvgIcon icon="grid" @click="copy" />
      <SvgIcon icon="grid-bottom" @click="copy" />
      <SvgIcon icon="grid-top" @click="copy" />
      <SvgIcon icon="grid-left" @click="copy" />
      <SvgIcon icon="grid-right" @click="copy" />
      <SvgIcon icon="whole-world" @click="copy" />
      <SvgIcon icon="security-shield" @click="copy" />
    </div>
    <div class="design_icon_box">
      <SvgIcon icon="security-shield" @click="copy" />
      <SvgIcon icon="secure-payment" @click="copy" />
      <SvgIcon icon="secure-search" @click="copy" />
      <SvgIcon icon="control-board" @click="copy" />
      <SvgIcon icon="wallet" @click="copy" />
      <SvgIcon icon="storage-card" @click="copy" />
      <SvgIcon icon="storage-card-extract" @click="copy" />
    </div>
    <div class="design_icon_box">
      <SvgIcon icon="security-shield-fill" @click="copy" />
      <SvgIcon icon="secure-payment-fill" @click="copy" />
      <SvgIcon icon="secure-search-fill" @click="copy" />
      <SvgIcon icon="control-board-fill" @click="copy" />
      <SvgIcon icon="wallet-fill" @click="copy" />
      <SvgIcon icon="storage-card-fill" @click="copy" />
    </div>
    <div class="design_icon_box">
      <SvgIcon icon="lock-open" @click="copy" />
      <SvgIcon icon="lock" @click="copy" />
      <SvgIcon icon="headset" @click="copy" />
      <SvgIcon icon="lightning" @click="copy" />
      <SvgIcon icon="fire" @click="copy" />
      <SvgIcon icon="cloud" @click="copy" />
      <SvgIcon icon="cloud-storage" @click="copy" />
      <SvgIcon icon="cloud-upload" @click="copy" />
      <SvgIcon icon="cloud-download" @click="copy" />
      <SvgIcon icon="cloud-refresh" @click="copy" />
      <SvgIcon icon="data-review" @click="copy" />
      <SvgIcon icon="data-pass" @click="copy" />
      <SvgIcon icon="data-warn" @click="copy" />
      <SvgIcon icon="data-refresh" @click="copy" />
      <SvgIcon icon="data-search" @click="copy" />
      <SvgIcon icon="data-materials" @click="copy" />
      <SvgIcon icon="data-security" @click="copy" />
      <SvgIcon icon="data-expiration" @click="copy" />
    </div>
    <div class="design_icon_box">
      <SvgIcon icon="lock-open-fill" @click="copy" />
      <SvgIcon icon="lock-fill" @click="copy" />
      <SvgIcon icon="headset-fill" @click="copy" />
      <SvgIcon icon="lightning-fill" @click="copy" />
      <SvgIcon icon="fire-fill" @click="copy" />
      <SvgIcon icon="cloud-fill" @click="copy" />
    </div>
    <div class="design_icon_box">
      <SvgIcon icon="house" @click="copy" />
      <SvgIcon icon="trophy" @click="copy" />
      <SvgIcon icon="usb" @click="copy" />
      <SvgIcon icon="printer" @click="copy" />
      <SvgIcon icon="camera" @click="copy" />
      <SvgIcon icon="phone" @click="copy" />
      <SvgIcon icon="rocket" @click="copy" />
      <SvgIcon icon="bag" @click="copy" />
      <SvgIcon icon="gift" @click="copy" />
      <SvgIcon icon="t-shirt" @click="copy" />
      <SvgIcon icon="car" @click="copy" />
      <SvgIcon icon="bottle" @click="copy" />
      <SvgIcon icon="crown" @click="copy" />
      <SvgIcon icon="flag" @click="copy" />
      <SvgIcon icon="mobile-phone" @click="copy" />
      <SvgIcon icon="mobile-phone-big" @click="copy" />
      <SvgIcon icon="video-recorder" @click="copy" />
      <SvgIcon icon="video-recorder-add" @click="copy" />
      <SvgIcon icon="screen" @click="copy" />
      <SvgIcon icon="laptop" @click="copy" />
    </div>
    <div class="design_icon_box">
      <SvgIcon icon="house-fill" @click="copy" />
      <SvgIcon icon="trophy-fill" @click="copy" />
      <SvgIcon icon="usb-fill" @click="copy" />
      <SvgIcon icon="printer-fill" @click="copy" />
      <SvgIcon icon="camera-fill" @click="copy" />
      <SvgIcon icon="phone-fill" @click="copy" />
      <SvgIcon icon="rocket-fill" @click="copy" />
      <SvgIcon icon="bag-fill" @click="copy" />
      <SvgIcon icon="gift-fill" @click="copy" />
      <SvgIcon icon="t-shirt-fill" @click="copy" />
      <SvgIcon icon="car-fill" @click="copy" />
      <SvgIcon icon="bottle-fill" @click="copy" />
      <SvgIcon icon="crown-fill" @click="copy" />
      <SvgIcon icon="flag-fill" @click="copy" />
      <SvgIcon icon="mobile-phone-fill" @click="copy" />
      <SvgIcon icon="mobile-phone-big-fill" @click="copy" />
      <SvgIcon icon="video-recorder-fill" @click="copy" />
    </div>
    <div class="design_icon_box">
      <SvgIcon icon="warning-light" @click="copy" />
      <SvgIcon icon="wrench" @click="copy" />
      <SvgIcon icon="painting" @click="copy" />
      <SvgIcon icon="robot" @click="copy" />
      <SvgIcon icon="bug" @click="copy" />
      <SvgIcon icon="heap" @click="copy" />
      <SvgIcon icon="home" @click="copy" />
      <SvgIcon icon="key" @click="copy" />
      <SvgIcon icon="brush" @click="copy" />
      <SvgIcon icon="bar-code" @click="copy" />
      <SvgIcon icon="overlap" @click="copy" />
      <SvgIcon icon="diagrams" @click="copy" />
      <SvgIcon icon="analysis" @click="copy" />
    </div>
    <div class="design_icon_box">
      <SvgIcon icon="warning-light-fill" @click="copy" />
      <SvgIcon icon="wrench-fill" @click="copy" />
      <SvgIcon icon="painting-fill" @click="copy" />
      <SvgIcon icon="robot-fill" @click="copy" />
      <SvgIcon icon="bug-fill" @click="copy" />
      <SvgIcon icon="heap-fill" @click="copy" />
      <SvgIcon icon="home-fill" @click="copy" />
    </div>
    <div class="design_icon_box">
      <SvgIcon icon="tetris" @click="copy" />
      <SvgIcon icon="plug-socket" @click="copy" />
      <SvgIcon icon="command" @click="copy" />
      <SvgIcon icon="component" @click="copy" />
      <SvgIcon icon="tree-structure-vertical" @click="copy" />
      <SvgIcon icon="tree-structure-horizontal" @click="copy" />
      <SvgIcon icon="four-corners" @click="copy" />
      <SvgIcon icon="sql" @click="copy" />
      <SvgIcon icon="route" @click="copy" />
      <SvgIcon icon="add-branch" @click="copy" />
      <SvgIcon icon="add-node" @click="copy" />
      <SvgIcon icon="branch-left" @click="copy" />
      <SvgIcon icon="branch-top" @click="copy" />
      <SvgIcon icon="crossroads" @click="copy" />
      <SvgIcon icon="node-shif-left" @click="copy" />
      <SvgIcon icon="node-shif-right" @click="copy" />
      <SvgIcon icon="enter-code" @click="copy" />
      <SvgIcon icon="line-chart" @click="copy" />
      <SvgIcon icon="delineation" @click="copy" />
      <SvgIcon icon="anchoring" @click="copy" />
      <SvgIcon icon="wifi" @click="copy" />
    </div>
    <div class="design_icon_box">
      <SvgIcon icon="tetris-fill" @click="copy" />
      <SvgIcon icon="plug-socket-fill" @click="copy" />
      <SvgIcon icon="command-fill" @click="copy" />
    </div>
    <div class="design_icon_box">
      <SvgIcon icon="node-divergence" @click="copy" />
      <SvgIcon icon="node-movement" @click="copy" />
      <SvgIcon icon="node-side" @click="copy" />
      <SvgIcon icon="node-binary" @click="copy" />
    </div>
    <div class="design_icon_box">
      <SvgIcon icon="abstract" @click="copy" />
      <SvgIcon icon="copy" @click="copy" />
      <SvgIcon icon="folder" @click="copy" />
      <SvgIcon icon="folder-open" @click="copy" />
      <SvgIcon icon="folder-add" @click="copy" />
      <SvgIcon icon="folder-view" @click="copy" />
    </div>
    <div class="design_icon_box">
      <SvgIcon icon="abstract-fill" @click="copy" />
      <SvgIcon icon="copy-fill" @click="copy" />
      <SvgIcon icon="folder-fill" @click="copy" />
      <SvgIcon icon="folder-open-fill" @click="copy" />
      <SvgIcon icon="folder-add-fill" @click="copy" />
    </div>
    <div class="design_icon_box">
      <SvgIcon icon="memo" @click="copy" />
      <SvgIcon icon="calculator" @click="copy" />
      <SvgIcon icon="transform" @click="copy" />
      <SvgIcon icon="bar-chart" @click="copy" />
      <SvgIcon icon="dashboard" @click="copy" />
      <SvgIcon icon="time" @click="copy" />
      <SvgIcon icon="dialog-box" @click="copy" />
      <SvgIcon icon="wechat" @click="copy" />
      <SvgIcon icon="Incoming-call" @click="copy" />
    </div>
    <div class="design_icon_box">
      <SvgIcon icon="memo-fill" @click="copy" />
      <SvgIcon icon="calculator-fill" @click="copy" />
      <SvgIcon icon="transform-fill" @click="copy" />
      <SvgIcon icon="bar-chart-fill" @click="copy" />
      <SvgIcon icon="dashboard-fill" @click="copy" />
      <SvgIcon icon="time-fill" @click="copy" />
      <SvgIcon icon="dialog-box-fill" @click="copy" />
    </div>
    <div class="design_title">使用场景</div>
    <div class="design_description">使用简单的抽象图形向使用者反映直观操作功能，快捷传达信息，表意明确，便于记忆。</div>
    <div class="design_title">icon尺寸</div>
    <div class="design_description">
      <p>绘制尺寸：画板1024*1024；线宽72px，外框圆角8px；（特殊情况时可按8的倍数延伸）</p>
      <p>导出上传尺寸：32*32px</p>
      <p>设计常用尺寸：</p>
      <p>12*12px（常用于小箭头，小按钮，小输入框，小选择器等组件）</p>
      <p>14*14px（常用于箭头，大按钮，大输入框，大选择器，表单等组件）</p>
      <p>16*16px（常用于导航，表格等组件）</p>
      <p>24*24px（常用于评分等组件）</p>
      <p>24*24px（常用于用户头像，固钉等组件）</p>
      <p>48*48px（常用于步骤条，对话框提示icon等组件）</p>
      <p>48*48px（常用于进度圈，弹窗警示图标等组件）</p>
    </div>
    <div class="design_title">keyline</div>
    <div class="design_example">
      <div>
        <svg width="482" height="482" viewBox="0 0 482 482" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1.5" y="1.5" width="479" height="479" fill="white" stroke="#979797" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M31.2344 1V481V1Z" fill="#E7EBF0" />
          <path d="M31.2344 1V481" stroke="#E7EBF0" stroke-linecap="square" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M61.2344 1V481V1Z" fill="#E7EBF0" />
          <path d="M61.2344 1V481" stroke="#E7EBF0" stroke-linecap="square" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M91.2344 1V481V1Z" fill="#E7EBF0" />
          <path d="M91.2344 1V481" stroke="#E7EBF0" stroke-linecap="square" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M121.234 1V481V1Z" fill="#E7EBF0" />
          <path d="M121.234 1V481" stroke="#E7EBF0" stroke-linecap="square" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M151.234 1V481V1Z" fill="#E7EBF0" />
          <path d="M151.234 1V481" stroke="#E7EBF0" stroke-linecap="square" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M181.234 1V481V1Z" fill="#E7EBF0" />
          <path d="M181.234 1V481" stroke="#E7EBF0" stroke-linecap="square" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M211.234 1V481V1Z" fill="#E7EBF0" />
          <path d="M211.234 1V481" stroke="#E7EBF0" stroke-linecap="square" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M241.234 1V481V1Z" fill="#E7EBF0" />
          <path d="M241.234 1V481" stroke="#E7EBF0" stroke-linecap="square" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M270.766 1V481V1Z" fill="#E7EBF0" />
          <path d="M270.766 1V481" stroke="#E7EBF0" stroke-linecap="square" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M300.766 1V481V1Z" fill="#E7EBF0" />
          <path d="M300.766 1V481" stroke="#E7EBF0" stroke-linecap="square" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M330.766 1V481V1Z" fill="#E7EBF0" />
          <path d="M330.766 1V481" stroke="#E7EBF0" stroke-linecap="square" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M360.766 1V481V1Z" fill="#E7EBF0" />
          <path d="M360.766 1V481" stroke="#E7EBF0" stroke-linecap="square" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M390.766 1V481V1Z" fill="#E7EBF0" />
          <path d="M390.766 1V481" stroke="#E7EBF0" stroke-linecap="square" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M420.766 1V481V1Z" fill="#E7EBF0" />
          <path d="M420.766 1V481" stroke="#E7EBF0" stroke-linecap="square" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M450.766 1V481V1Z" fill="#E7EBF0" />
          <path d="M450.766 1V481" stroke="#E7EBF0" stroke-linecap="square" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M1 450.766L481 450.766L1 450.766Z" fill="#E7EBF0" />
          <path d="M1 450.766L481 450.766" stroke="#E7EBF0" stroke-linecap="square" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M1 420.766L481 420.766L1 420.766Z" fill="#E7EBF0" />
          <path d="M1 420.766L481 420.766" stroke="#E7EBF0" stroke-linecap="square" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M1 390.766L481 390.766L1 390.766Z" fill="#E7EBF0" />
          <path d="M1 390.766L481 390.766" stroke="#E7EBF0" stroke-linecap="square" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M1 360.766L481 360.766L1 360.766Z" fill="#E7EBF0" />
          <path d="M1 360.766L481 360.766" stroke="#E7EBF0" stroke-linecap="square" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M1 330.766L481 330.766L1 330.766Z" fill="#E7EBF0" />
          <path d="M1 330.766L481 330.766" stroke="#E7EBF0" stroke-linecap="square" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M1 300.766L481 300.766L1 300.766Z" fill="#E7EBF0" />
          <path d="M1 300.766L481 300.766" stroke="#E7EBF0" stroke-linecap="square" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M1 270.766L481 270.766L1 270.766Z" fill="#E7EBF0" />
          <path d="M1 270.766L481 270.766" stroke="#E7EBF0" stroke-linecap="square" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M1 240.766L481 240.766L1 240.766Z" fill="#E7EBF0" />
          <path d="M1 240.766L481 240.766" stroke="#E7EBF0" stroke-linecap="square" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M1 211.234L481 211.234L1 211.234Z" fill="#E7EBF0" />
          <path d="M1 211.234L481 211.234" stroke="#E7EBF0" stroke-linecap="square" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M1 181.234L481 181.234L1 181.234Z" fill="#E7EBF0" />
          <path d="M1 181.234L481 181.234" stroke="#E7EBF0" stroke-linecap="square" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M1 151.234L481 151.234L1 151.234Z" fill="#E7EBF0" />
          <path d="M1 151.234L481 151.234" stroke="#E7EBF0" stroke-linecap="square" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M1 121.234L481 121.234L1 121.234Z" fill="#E7EBF0" />
          <path d="M1 121.234L481 121.234" stroke="#E7EBF0" stroke-linecap="square" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M1 91.2344L481 91.2344L1 91.2344Z" fill="#E7EBF0" />
          <path d="M1 91.2344L481 91.2344" stroke="#E7EBF0" stroke-linecap="square" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M1 61.2344L481 61.2344L1 61.2344Z" fill="#E7EBF0" />
          <path d="M1 61.2344L481 61.2344" stroke="#E7EBF0" stroke-linecap="square" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M1 31.2344L481 31.2344L1 31.2344Z" fill="#E7EBF0" />
          <path d="M1 31.2344L481 31.2344" stroke="#E7EBF0" stroke-linecap="square" />
          <circle cx="241.493" cy="240.507" r="209.438" stroke="#979797" />
          <circle cx="241" cy="241" r="104.469" stroke="#979797" />
          <rect x="32.5" y="76.4077" width="418.877" height="329.185" stroke="#979797" />
          <rect x="54.7227" y="53.7383" width="373.538" height="373.538" stroke="#979797" />
          <rect x="76.4062" y="31.0688" width="329.185" height="418.877" stroke="#979797" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M241.234 31.627L422.601 345.342H59.8682L241.234 31.627Z" stroke="#979797" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M241.235 136.031L331.419 293.731H151.05L241.235 136.031Z" stroke="#979797" />
        </svg>
      </div>
      <div style="position: relative">
        <svg width="482" height="482" viewBox="0 0 482 482" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1.5" y="1.5" width="479" height="479" fill="white" stroke="#979797" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M31.2344 1V481V1Z" fill="#E7EBF0" />
          <path d="M31.2344 1V481" stroke="#E7EBF0" stroke-linecap="square" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M61.2344 1V481V1Z" fill="#E7EBF0" />
          <path d="M61.2344 1V481" stroke="#E7EBF0" stroke-linecap="square" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M91.2344 1V481V1Z" fill="#E7EBF0" />
          <path d="M91.2344 1V481" stroke="#E7EBF0" stroke-linecap="square" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M121.234 1V481V1Z" fill="#E7EBF0" />
          <path d="M121.234 1V481" stroke="#E7EBF0" stroke-linecap="square" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M151.234 1V481V1Z" fill="#E7EBF0" />
          <path d="M151.234 1V481" stroke="#E7EBF0" stroke-linecap="square" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M181.234 1V481V1Z" fill="#E7EBF0" />
          <path d="M181.234 1V481" stroke="#E7EBF0" stroke-linecap="square" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M211.234 1V481V1Z" fill="#E7EBF0" />
          <path d="M211.234 1V481" stroke="#E7EBF0" stroke-linecap="square" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M241.234 1V481V1Z" fill="#E7EBF0" />
          <path d="M241.234 1V481" stroke="#E7EBF0" stroke-linecap="square" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M270.766 1V481V1Z" fill="#E7EBF0" />
          <path d="M270.766 1V481" stroke="#E7EBF0" stroke-linecap="square" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M300.766 1V481V1Z" fill="#E7EBF0" />
          <path d="M300.766 1V481" stroke="#E7EBF0" stroke-linecap="square" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M330.766 1V481V1Z" fill="#E7EBF0" />
          <path d="M330.766 1V481" stroke="#E7EBF0" stroke-linecap="square" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M360.766 1V481V1Z" fill="#E7EBF0" />
          <path d="M360.766 1V481" stroke="#E7EBF0" stroke-linecap="square" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M390.766 1V481V1Z" fill="#E7EBF0" />
          <path d="M390.766 1V481" stroke="#E7EBF0" stroke-linecap="square" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M420.766 1V481V1Z" fill="#E7EBF0" />
          <path d="M420.766 1V481" stroke="#E7EBF0" stroke-linecap="square" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M450.766 1V481V1Z" fill="#E7EBF0" />
          <path d="M450.766 1V481" stroke="#E7EBF0" stroke-linecap="square" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M1 450.766L481 450.766L1 450.766Z" fill="#E7EBF0" />
          <path d="M1 450.766L481 450.766" stroke="#E7EBF0" stroke-linecap="square" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M1 420.766L481 420.766L1 420.766Z" fill="#E7EBF0" />
          <path d="M1 420.766L481 420.766" stroke="#E7EBF0" stroke-linecap="square" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M1 390.766L481 390.766L1 390.766Z" fill="#E7EBF0" />
          <path d="M1 390.766L481 390.766" stroke="#E7EBF0" stroke-linecap="square" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M1 360.766L481 360.766L1 360.766Z" fill="#E7EBF0" />
          <path d="M1 360.766L481 360.766" stroke="#E7EBF0" stroke-linecap="square" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M1 330.766L481 330.766L1 330.766Z" fill="#E7EBF0" />
          <path d="M1 330.766L481 330.766" stroke="#E7EBF0" stroke-linecap="square" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M1 300.766L481 300.766L1 300.766Z" fill="#E7EBF0" />
          <path d="M1 300.766L481 300.766" stroke="#E7EBF0" stroke-linecap="square" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M1 270.766L481 270.766L1 270.766Z" fill="#E7EBF0" />
          <path d="M1 270.766L481 270.766" stroke="#E7EBF0" stroke-linecap="square" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M1 240.766L481 240.766L1 240.766Z" fill="#E7EBF0" />
          <path d="M1 240.766L481 240.766" stroke="#E7EBF0" stroke-linecap="square" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M1 211.234L481 211.234L1 211.234Z" fill="#E7EBF0" />
          <path d="M1 211.234L481 211.234" stroke="#E7EBF0" stroke-linecap="square" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M1 181.234L481 181.234L1 181.234Z" fill="#E7EBF0" />
          <path d="M1 181.234L481 181.234" stroke="#E7EBF0" stroke-linecap="square" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M1 151.234L481 151.234L1 151.234Z" fill="#E7EBF0" />
          <path d="M1 151.234L481 151.234" stroke="#E7EBF0" stroke-linecap="square" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M1 121.234L481 121.234L1 121.234Z" fill="#E7EBF0" />
          <path d="M1 121.234L481 121.234" stroke="#E7EBF0" stroke-linecap="square" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M1 91.2344L481 91.2344L1 91.2344Z" fill="#E7EBF0" />
          <path d="M1 91.2344L481 91.2344" stroke="#E7EBF0" stroke-linecap="square" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M1 61.2344L481 61.2344L1 61.2344Z" fill="#E7EBF0" />
          <path d="M1 61.2344L481 61.2344" stroke="#E7EBF0" stroke-linecap="square" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M1 31.2344L481 31.2344L1 31.2344Z" fill="#E7EBF0" />
          <path d="M1 31.2344L481 31.2344" stroke="#E7EBF0" stroke-linecap="square" />
          <circle cx="241.493" cy="240.507" r="209.438" stroke="#979797" />
          <circle cx="241" cy="241" r="104.469" stroke="#979797" />
          <rect x="32.5" y="76.4077" width="418.877" height="329.185" stroke="#979797" />
          <rect x="54.7227" y="53.7383" width="373.538" height="373.538" stroke="#979797" />
          <rect x="76.4062" y="31.0688" width="329.185" height="418.877" stroke="#979797" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M241.234 31.627L422.601 345.342H59.8682L241.234 31.627Z" stroke="#979797" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M241.235 136.031L331.419 293.731H151.05L241.235 136.031Z" stroke="#979797" />
        </svg>
        <div style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%)">
          <svg width="480" height="480" viewBox="0 0 480 480" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.6">
              <path
                d="M412.5 52.5H67.5C59.2031 52.5 52.5 59.2031 52.5 67.5V412.5C52.5 420.797 59.2031 427.5 67.5 427.5H412.5C420.797 427.5 427.5 420.797 427.5 412.5V67.5C427.5 59.2031 420.797 52.5 412.5 52.5ZM393.75 393.75H86.25V86.25H393.75V393.75Z"
                fill="#36B39E" />
              <path
                d="M226.875 171.562H253.125C255.188 171.562 256.875 169.875 256.875 167.812V141.562C256.875 139.5 255.188 137.812 253.125 137.812H226.875C224.812 137.812 223.125 139.5 223.125 141.562V167.812C223.125 169.875 224.812 171.562 226.875 171.562ZM141.562 256.875H167.812C169.875 256.875 171.562 255.188 171.562 253.125V226.875C171.562 224.812 169.875 223.125 167.812 223.125H141.562C139.5 223.125 137.812 224.812 137.812 226.875V253.125C137.812 255.188 139.5 256.875 141.562 256.875ZM312.188 256.875H338.438C340.5 256.875 342.188 255.188 342.188 253.125V226.875C342.188 224.812 340.5 223.125 338.438 223.125H312.188C310.125 223.125 308.438 224.812 308.438 226.875V253.125C308.438 255.188 310.125 256.875 312.188 256.875ZM226.875 256.875H253.125C255.188 256.875 256.875 255.188 256.875 253.125V226.875C256.875 224.812 255.188 223.125 253.125 223.125H226.875C224.812 223.125 223.125 224.812 223.125 226.875V253.125C223.125 255.188 224.812 256.875 226.875 256.875ZM226.875 342.188H253.125C255.188 342.188 256.875 340.5 256.875 338.438V312.188C256.875 310.125 255.188 308.438 253.125 308.438H226.875C224.812 308.438 223.125 310.125 223.125 312.188V338.438C223.125 340.5 224.812 342.188 226.875 342.188Z"
                fill="#36B39E" />
              <path d="M53 68C53 59.1634 60.1634 52 69 52H85V84H53V68Z" fill="#D9D9D9" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'

function copy(e) {
  let name = e.target.getAttribute('xlink:href') || e.target.children[0].getAttribute('xlink:href')
  name = name.replace('#icon-', '')
  navigator.clipboard.writeText(`<SvgIcon icon="${name}" />`)
  ElMessage.success('已复制: ' + `<SvgIcon icon="${name}" />`)
}
</script>

<style scoped lang="scss">
.icon_view {
  @include designMainContentContainer();
}
.design_example {
  display: flex;
  gap: 90px;
  margin-bottom: 80px;
}
.design_icon_box {
  display: flex;
  gap: 40px;
  margin-bottom: 40px;
  > svg {
    flex: none;
    cursor: pointer;
  }
}
</style>

<template>
  <div class="AgGridVue1">
    <ContextMenu />
    <AgGridVue :id="agTableOptions.id || 'ag-table'" :style="agTableOptions.style || { height: '95vh', width: '100%' }"
      :class="[`ag-theme-${agTableOptions.theme}`]" :grid-options="agTableOptions.gridOptions"
      :column-defs="agTableOptions.columnDefs" :row-data="agTableOptions.rowData" :enable-col-resize="true"
      :row-selection="agTableOptions.rowSelection || 'multiple'" @gridReady="onGridReady" />
  </div>
</template>
<script>
import { AgGridVue } from 'ag-grid-vue'
import { read, utils, write } from 'xlsx'
import ContextMenu from './ContextMenu.vue'
export default {
  name: 'AgGridVue1',
  components: {
    AgGridVue,
    ContextMenu
  },
  mounted() {
    console.log(this.parseExcel)
  },
  data() {
    return {
      activeIndex: "1",
      agTable: null,
      agTableOptions: {
        id: 'ag-table1',
        theme: 'balham',
        gridOptions: {
          // 分页
          pagination: false, // 【重要】分页已启用，前端分页。
          // paginationPageSize:50 ,// 【重要】数。每页加载多少行。默认值= 100.如果paginationAutoPageSize 指定，则忽略此属性。请参阅自定义分页示例。
          paginationAutoPageSize: true, // 【重要】True - 每页加载的行数由ag-Grid自动调整，因此每个页面显示足够的行以填充为网格指定的区域。是以表格高度为限制，此属性设定之后paginationPageSize:50失效
          // suppressPaginationPanel: true, // True - 开箱即用的ag-Grid导航控件是隐藏的。如果pagination=true您想要提供自己的分页控件，这将非常有用 。 False（默认） - 当pagination=true它自动在底部显示必要的控件，以便用户可以浏览不同的页面。请参见示例自定义分页控件。
          rowHeight: 34, // 【重要】默认行高度（以像素为单位）。默认值为30。
          animateRows: true, // 【重要】设置为true以启用行动画。 那个数据刷新的蓝色行底色，适用于数据刷新的
          rowStyle: {
            'font-weight': '400',
            color: '#999',
            'font-size': '14px'
          }, // 【重要】给出特定行的样式。请参见行样式。
          // 列头默认配置项
          defaultColDef: {
            sort: 'asc', // 前端排序方式 asc 顺序 desc倒序，还有自定义拍序 .优先顺序为 sortable为true,才能设置排序方法，sort与 comparator 不能共存
            // comparator: dateComparator, // 自定义排序，dateComparator为排序方法名
            sortable: true, // 是否开启排序，这个是展示原本的列头排序，当sort设置不是true时，有数字展示；操作之后就消失
            resizable: true, // true可以拖动改变列的大小，false不允许用户拖动改变列大小
            filter: true, // 是否显示筛选
            minWidth: 100, // 【重要】最小宽度， 最小和最大宽度可限制列拖动
            maxWidth: 350 // 【重要】最大宽度
          }
        },
        // 行数据
        rowData: [],
        // 列头配置
        columnDefs: [
          // 首列全选或单选列
          // {
          //   headerName: '#',
          //   field: 'numericalOrder',
          //   width: 120,
          //   // initialPinned: 'left', // 固定在左方
          //   pinned: 'left', // 固定在左侧
          //   lockPosition: true, // 锁定位置，默认为false,该属性设置为true时，拖拽列无效；如果不设置pinned: 'right', 默认展示在最左方
          //   checkboxSelection: true, // 设置当前列有可选项
          //   filter: false,
          //   headerCheckboxSelection: true,
          //   headerCheckboxSelectionFilteredOnly: true
          // },
          {
            headerName: '姓名',
            field: 'name',
            pinned: 'left', // 固定在左侧
            headerComponentParams: { menuIcon: 'fa-cog' },

            // checkboxSelection: true, // 单行的单个复选框
            // tooltipField: 'status',
            // sortable: false, // false禁止排序, true允许排序
            // comparator: dateComparator, // 自定义排序，dateComparator为排序方法名
            // 给单元格添加特定的其他标签
            cellRenderer: function (params) {
              const getDom = (color = '#E6A23C') => {
                return (
                  `<span style="background-color:${color};display:inline-block;width:5px;height:5px;border-radius:5px;margin-right:5px;margin-bottom:2px"></span>` +
                  params.value
                )
              }
              if (params.value === '李四') {
                return getDom('#E6A23C')
              } else if (params.value === '王五') {
                return getDom('#ffffff')
              } else {
                return params.value
              }
            },
            // 单元格样式颜色
            cellStyle: function (params) {
              let color = '#25262e'
              if (params.value === '张三') {
                color = '#b4b61a'
              } else if (params.value === '李四') {
                color = '#3a65ff'
              } else if (params.value === '王五') {
                color = '#1AB66C'
              } else if (params.value === '王五3') {
                color = '#DC143C'
              } else if (params.value === '') {
                color = '#ffffff'
              }
              return { color: '#fff', background: color }
            },

            tooltipValueGetter: function (params) {
              return params.value === '王五2' ? '更改王五2' : params.value
            },
            // 单元格数据过滤
            valueFormatter: function (params) {
              // console.log('params', params)
              return params.value === '王五4' ? '更改王五4' : params.value
            }
          },
          {
            headerName: '性别',
            field: 'sex',
            editable: true,
            cellEditor: 'agSelectCellEditor', // 编辑时 显示下拉列表
            cellEditorParams: { values: ['男', '女'] }
          },
          {
            headerName: '年龄年龄龄年龄年龄',
            field: 'age',
            sort: 'desc'
          },
          {
            headerName: '年龄1',
            field: 'age1',
            sort: 'desc'
          },
          {
            headerName: '年龄之和',
            field: 'age2',
            sort: 'desc',
            cellRenderer: (params) => {
              return Number(params.data.age) + Number(params.data.age1)
            }
          },
          {
            headerName: '籍贯',
            field: 'jg',

            filterParams: {
              buttons: ['apply', 'reset'],
              closeOnApply: true
            }
          },
          {
            headerName: '省份',
            field: 'sf',
            tooltipField: 'sf',
            tooltipComponentParams: { color: '#ececec' },
            floatingFilterComponentParams: {
              suppressFilterButton: true,
              color: 'red'
            }
          },
          {
            headerName: '地址',
            field: 'dz',

            tooltipField: 'dz',
            editable: true, // 如果defaultColDef未全局声明editable: true,单个的列想用，就必须单独声明
            cellEditor: 'agLargeTextCellEditor', // 编辑时 显示长文本框
            cellEditorParams: {
              maxLength: '100', // 能输入的文本长度限制
              cols: '50', // 显示为10宽度
              rows: '2' // 显示为1行的高度
            }
          },
          {
            headerName: '时间',
            field: 'date'
          }
        ],
        // 行选择配置： 单选single/多选multiple
        rowSelection: 'multiple'
      }
    }
  },
  methods: {
    onContextmenu(event) {
      console.log(event)
      this.$contextmenu({
        items: [
          {
            label: "返回(B)",
            onClick: () => {
              this.message = "返回(B)";
              console.log("返回(B)");
            }
          },
          { label: "前进(F)", disabled: true },
          { label: "重新加载(R)", divided: true, icon: "el-icon-refresh" },
          { label: "另存为(A)..." },
          { label: "打印(P)...", icon: "el-icon-printer" },
          { label: "投射(C)...", divided: true },
          {
            label: "使用网页翻译(T)",
            divided: true,
            minWidth: 0,
            children: [{ label: "翻译成简体中文" }, { label: "翻译成繁体中文" }]
          },
          {
            label: "截取网页(R)",
            minWidth: 0,
            children: [
              {
                label: "截取可视化区域",
                onClick: () => {
                  this.message = "截取可视化区域";
                  console.log("截取可视化区域");
                }
              },
              { label: "截取全屏" }
            ]
          },
          { label: "查看网页源代码(V)", icon: "el-icon-view" },
          { label: "检查(N)" }
        ],
        event, // 鼠标事件信息
        customClass: "custom-class", // 自定义菜单 class
        zIndex: 3, // 菜单样式 z-index
        minWidth: 230 // 主菜单最小宽度
      });
      return false
    },
    exportExcel() {
      const workbook = utils.book_new();
      console.log(this.agTableOptions.rowData)
      const worksheet = utils.json_to_sheet(this.agTableOptions.rowData);
      utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      const excelBuffer = write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveExcelFile(excelBuffer, 'export.xlsx');
    },
    saveExcelFile(buffer, fileName) {
      const data = new Blob([buffer], { type: 'application/octet-stream' });
      const url = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    handleSelectFile(file) {
      let reader = new FileReader();
      let _this = this
      reader.onload = function (e) {
        _this.parseExcel(e.target.result);
      };
      reader.readAsArrayBuffer(file);
    },
    parseExcel(data) {
      const workbook = read(data); // 从原始数据获取工作簿
      // 后端使用可以使用 readFile() 方法直接读取文件
      var first_sheet_name = workbook.SheetNames[0]; // 获得第一个工作表名称

      const worksheet = workbook.Sheets[first_sheet_name]; // 获取工作表

      console.log(worksheet)
      let jsonData = utils.sheet_to_json(worksheet, { header: 1 });

      console.log(jsonData)

      this.renderExcelRow(jsonData, jsonData[0])
      this.renderExcelHeader(jsonData[0])

    },
    renderExcelHeader(headerRow) {
      this.agTableOptions.columnDefs = headerRow.map((header) => ({
        headerName: header,
        field: header,
        editable: true,
        // checkboxSelection: true
      }));
      this.agTableOptions.columnDefs[0].checkboxSelection = true

    },
    renderExcelRow(rowData, headerData) {
      let sliceData = rowData.slice(1)
      const updateList = []
      let update = {}
      sliceData.forEach(item => {
        update = {}
        headerData.forEach((key, index) => {
          update[key] = item[index]
        })
        updateList.push(update)
      })
      console.log(updateList)
      this.agTableOptions.rowData = updateList
    },
    onGridReady(params) {
      this.agTable = params
      const rowData = this.getRowData()
      console.log('rowData=====>', rowData)
      params.api.setRowData(rowData)
    },

    // 获取0-9的随机数
    getRandom9() {
      const randNum = Math.random()
      const random_1 = randNum + ''
      const age = (randNum * 100).toFixed(2)
      const age1 = (randNum * 500).toFixed(2)
      const sex = random_1 > 0.5 ? '男' : '女'
      const ran = random_1.charAt(3)
      // console.log("随机数ran", ran);
      return { ran, sex, age, age1 }
    },
    // 生成随机时间
    getRandomDate() {
      var maxdaterandom = new Date().getTime()
      // 由于当前环境为北京GMT+8时区，所以与GMT有8个小时的差值
      var mindaterandom = new Date(1970, 0, 1, 8).getTime()
      var randomdate = this.getRandom(mindaterandom, maxdaterandom)
      const ranDate = new Date(randomdate)
      const year = ranDate.getFullYear()
      const mon = ranDate.getMonth() + 1
      const month = mon < 10 ? '0' + mon : mon
      const day =
        ranDate.getDate() < 10 ? '0' + ranDate.getDate() : ranDate.getDate()
      var dateStr = `${year}-${month}-${day}`
      // console.log(dateStr);
      return dateStr
    },
    // 生成随机时间的随机数
    getRandom(min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min + 1)) + min
    },
    // 获取行单元格数据
    getRowData() {
      const item = {
        name: '王五',
        sex: '男',
        age: '35',
        jg: '中国',
        sf: '浙江',
        dz: '杭州市古墩路12号',
        date: '2021-10-06'
      }
      const nameArr = [
        '张三',
        '李四',
        '王五',
        '王五1',
        '王五2',
        '王五3',
        '王五4',
        '王五5',
        '王五6',
        '王五7'
      ]
      const newData = []
      for (let i = 0; i < 999; i++) {
        const cell = JSON.parse(JSON.stringify(item))
        const random = this.getRandom9()
        cell.age = random.age
        cell.age1 = random.age1
        cell.name = nameArr[random.ran]
        cell.sex = random.sex
        cell.date = this.getRandomDate()
        newData.push(cell)
      }
      console.log('模拟数据', newData)
      return newData
    }
  }
}
</script>


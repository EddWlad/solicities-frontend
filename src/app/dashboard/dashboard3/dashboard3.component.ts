import { Component, OnInit } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexLegend,
  ApexPlotOptions,
  ApexResponsive,
  ApexFill,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { MatButtonModule } from '@angular/material/button';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { IncomeInfoBoxComponent } from '@shared/components/income-info-box/income-info-box.component';
import { MatCardModule } from '@angular/material/card';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { EmpTaskTabComponent } from '@shared/components/emp-task-tab/emp-task-tab.component';
import { ProjectHoursComponent } from '@shared/components/project-hours/project-hours.component';
import { ActivityListComponent } from '@shared/components/activity-list/activity-list.component';
import { AssignTaskComponent } from '@shared/components/assign-task/assign-task.component';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  colors: string[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  tooltip: ApexTooltip;
  title: ApexTitleSubtitle;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  fill: ApexFill;
};

interface Task {
  userImage: string;
  userName: string;
  taskDetails: string;
  status: string;
  statusClass: string;
  manager: string;
  progress: number;
  progressClass: string;
}

@Component({
    selector: 'app-dashboard3',
    templateUrl: './dashboard3.component.html',
    styleUrls: ['./dashboard3.component.scss'],
    imports: [
        BreadcrumbComponent,
        NgApexchartsModule,
        MatButtonModule,
        MatCardModule,
        NgScrollbarModule,
        IncomeInfoBoxComponent,
        EmpTaskTabComponent,
        ProjectHoursComponent,
        ActivityListComponent,
        AssignTaskComponent,
    ]
})
export class Dashboard3Component implements OnInit {
  public lineChartOptions!: Partial<ChartOptions>;
  public barChartOptions!: Partial<ChartOptions>;

  breadscrums = [
    {
      title: 'Dashboad',
      items: ['Home'],
      active: 'Dashboard 3',
    },
  ];

  constructor() {
    //constructor
  }

  ngOnInit() {
    this.chart1();
    this.chart2();
  }

  private chart1() {
    this.lineChartOptions = {
      series: [
        {
          name: 'High - 2013',
          data: [15, 13, 22, 23, 17, 32, 27],
        },
        {
          name: 'Low - 2013',
          data: [12, 18, 14, 18, 23, 13, 21],
        },
      ],
      chart: {
        height: 350,
        type: 'line',
        foreColor: '#9aa0ac',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ['#F45B5B', '#5F98CF'],
      stroke: {
        curve: 'smooth',
      },
      grid: {
        show: true,
        borderColor: '#9aa0ac',
        strokeDashArray: 1,
      },
      markers: {
        size: 3,
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        title: {
          text: 'Month',
        },
      },
      yaxis: {
        // opposite: true,
        title: {
          text: 'Temperature',
        },
        min: 5,
        max: 40,
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
      tooltip: {
        theme: 'dark',
        marker: {
          show: true,
        },
        x: {
          show: true,
        },
      },
    };
  }
  private chart2() {
    this.barChartOptions = {
      series: [
        {
          name: 'Product 1',
          data: [44, 55, 41, 67, 22, 43],
        },
        {
          name: 'Product 2',
          data: [13, 23, 20, 8, 13, 27],
        },
        {
          name: 'Product 3',
          data: [11, 17, 15, 15, 21, 14],
        },
        {
          name: 'Product 4',
          data: [21, 7, 25, 13, 22, 8],
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
        foreColor: '#9aa0ac',
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '30%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        type: 'category',
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      },
      grid: {
        show: true,
        borderColor: '#9aa0ac',
        strokeDashArray: 1,
      },
      legend: {
        show: false,
      },
      fill: {
        opacity: 0.8,
        colors: ['#01B8AA', '#374649', '#FD625E', '#F2C80F'],
      },
      tooltip: {
        theme: 'dark',
        marker: {
          show: true,
        },
        x: {
          show: true,
        },
      },
    };
  }

  // Employee task data

  employeeData = [
    {
      name: 'Sarah Smith',
      imgUrl: 'assets/images/user/user1.jpg',
      tasks: [
        {
          name: 'Task C',
          status: 'Completed',
          statusClass: 'col-green',
          manager: 'John Doe',
          progress: 72,
          progressBarClass: 'l-bg-green',
        },
        {
          name: 'Task A',
          status: 'On Process',
          statusClass: 'col-red',
          manager: 'John Doe',
          progress: 62,
          progressBarClass: 'l-bg-red',
        },
        {
          name: 'Task B',
          status: 'On Hold',
          statusClass: 'col-purple',
          manager: 'John Doe',
          progress: 40,
          progressBarClass: 'l-bg-purple',
        },
        {
          name: 'Task D',
          status: 'Completed',
          statusClass: 'col-green',
          manager: 'John Doe',
          progress: 72,
          progressBarClass: 'l-bg-green',
        },
        {
          name: 'Task E',
          status: 'On Hold',
          statusClass: 'col-purple',
          manager: 'John Doe',
          progress: 40,
          progressBarClass: 'l-bg-purple',
        },
        {
          name: 'Task P',
          status: 'On Hold',
          statusClass: 'col-purple',
          manager: 'John Doe',
          progress: 40,
          progressBarClass: 'l-bg-purple',
        },
        {
          name: 'Task O',
          status: 'On Process',
          statusClass: 'col-red',
          manager: 'John Doe',
          progress: 62,
          progressBarClass: 'l-bg-red',
        },
      ],
    },
    {
      name: 'Jalpa Joshi',
      imgUrl: 'assets/images/user/user2.jpg',
      tasks: [
        {
          name: 'Task D',
          status: 'On Process',
          statusClass: 'col-red',
          manager: 'John Doe',
          progress: 62,
          progressBarClass: 'l-bg-red',
        },
        {
          name: 'Task E',
          status: 'On Hold',
          statusClass: 'col-purple',
          manager: 'John Doe',
          progress: 40,
          progressBarClass: 'l-bg-purple',
        },
        {
          name: 'Task F',
          status: 'Completed',
          statusClass: 'col-green',
          manager: 'John Doe',
          progress: 72,
          progressBarClass: 'l-bg-green',
        },
        {
          name: 'Task G',
          status: 'On Process',
          statusClass: 'col-red',
          manager: 'John Doe',
          progress: 62,
          progressBarClass: 'l-bg-red',
        },
      ],
    },
    {
      name: 'Mark Peter',
      imgUrl: 'assets/images/user/user3.jpg',
      tasks: [
        {
          name: 'Task E',
          status: 'On Hold',
          statusClass: 'col-purple',
          manager: 'John Doe',
          progress: 40,
          progressBarClass: 'l-bg-purple',
        },
        {
          name: 'Task D',
          status: 'On Process',
          statusClass: 'col-red',
          manager: 'John Doe',
          progress: 62,
          progressBarClass: 'l-bg-red',
        },
        {
          name: 'Task F',
          status: 'Completed',
          statusClass: 'col-green',
          manager: 'John Doe',
          progress: 72,
          progressBarClass: 'l-bg-green',
        },
      ],
    },
  ];

  // activities

  activities = [
    {
      userImage: 'assets/images/user/user1.jpg',
      userName: 'Sarah Smith',
      label: 'File',
      labelStyle: 'lblFileStyle',
      time: '6 hours ago',
      message: 'hii John, I have upload doc related to task.',
      isActive: true,
    },
    {
      userImage: 'assets/images/user/user2.jpg',
      userName: 'Jalpa Joshi',
      label: 'Task',
      labelStyle: 'lblTaskStyle',
      time: '5 hours ago',
      message: 'Please do as specify. Let me know if you have any query.',
      isActive: false,
    },
    {
      userImage: 'assets/images/user/user3.jpg',
      userName: 'Lina Smith',
      label: 'Comment',
      labelStyle: 'lblCommentStyle',
      time: '6 hours ago',
      message: 'Hey, How are you??',
      isActive: false,
    },
    {
      userImage: 'assets/images/user/user4.jpg',
      userName: 'Jacob Ryan',
      label: 'Reply',
      labelStyle: 'lblReplyStyle',
      time: '7 hours ago',
      message: 'I am fine. You??',
      isActive: true,
    },
    {
      userImage: 'assets/images/user/user5.jpg',
      userName: 'Sarah Smith',
      label: 'File',
      labelStyle: 'lblFileStyle',
      time: '6 hours ago',
      message: 'hii John, I have upload doc related to task.',
      isActive: true,
    },
    {
      userImage: 'assets/images/user/user6.jpg',
      userName: 'Jalpa Joshi',
      label: 'Task',
      labelStyle: 'lblTaskStyle',
      time: '5 hours ago',
      message: 'Please do as specify. Let me know if you have any query.',
      isActive: false,
    },
  ];

  // task

  assignTasks: Task[] = [
    {
      userImage: 'assets/images/user/user1.jpg',
      userName: 'John Deo',
      taskDetails: 'Task A',
      status: 'Doing',
      statusClass: 'bg-green',
      manager: 'John Doe',
      progress: 62,
      progressClass: 'bg-green',
    },
    {
      userImage: 'assets/images/user/user2.jpg',
      userName: 'John Deo',
      taskDetails: 'Task B',
      status: 'To Do',
      statusClass: 'bg-purple',
      manager: 'John Doe',
      progress: 40,
      progressClass: 'bg-purple',
    },
    {
      userImage: 'assets/images/user/user3.jpg',
      userName: 'John Deo',
      taskDetails: 'Task C',
      status: 'On Hold',
      statusClass: 'bg-orange',
      manager: 'John Doe',
      progress: 72,
      progressClass: 'bg-orange',
    },
    {
      userImage: 'assets/images/user/user4.jpg',
      userName: 'John Deo',
      taskDetails: 'Task D',
      status: 'Waiting',
      statusClass: 'bg-cyan',
      manager: 'John Doe',
      progress: 95,
      progressClass: 'bg-cyan',
    },
    {
      userImage: 'assets/images/user/user5.jpg',
      userName: 'John Deo',
      taskDetails: 'Task E',
      status: 'Suspended',
      statusClass: 'bg-green',
      manager: 'John Doe',
      progress: 87,
      progressClass: 'bg-green',
    },
    {
      userImage: 'assets/images/user/user6.jpg',
      userName: 'Jane Smith',
      taskDetails: 'Task F',
      status: 'Doing',
      statusClass: 'bg-green',
      manager: 'John Doe',
      progress: 55,
      progressClass: 'bg-green',
    },
    {
      userImage: 'assets/images/user/user7.jpg',
      userName: 'Emily Johnson',
      taskDetails: 'Task G',
      status: 'To Do',
      statusClass: 'bg-purple',
      manager: 'John Doe',
      progress: 20,
      progressClass: 'bg-purple',
    },
    {
      userImage: 'assets/images/user/user8.jpg',
      userName: 'Michael Brown',
      taskDetails: 'Task H',
      status: 'On Hold',
      statusClass: 'bg-orange',
      manager: 'John Doe',
      progress: 10,
      progressClass: 'bg-orange',
    },
    {
      userImage: 'assets/images/user/user9.jpg',
      userName: 'Sarah Davis',
      taskDetails: 'Task I',
      status: 'Completed',
      statusClass: 'bg-blue',
      manager: 'John Doe',
      progress: 100,
      progressClass: 'bg-blue',
    },
  ];
}

import { Component, OnInit } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexTooltip,
  ApexPlotOptions,
  ApexDataLabels,
  ApexYAxis,
  ApexXAxis,
  ApexLegend,
  ApexResponsive,
  ApexFill,
  ApexStroke,
  ApexGrid,
  ApexTitleSubtitle,
  ApexStates,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { MatCardModule } from '@angular/material/card';
import { TableCardComponent } from '@shared/components/table-card/table-card.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NewOrderListComponent } from '@shared/components/new-order-list/new-order-list.component';
import { EarningSourceComponent } from '@shared/components/earning-source/earning-source.component';
import { ReviewWidgetComponent } from '@shared/components/review-widget/review-widget.component';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  responsive: ApexResponsive[];
  colors: string[];
  legend: ApexLegend;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  states: ApexStates;
  fill: ApexFill;
};

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  imports: [
    BreadcrumbComponent,
    NgApexchartsModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    TableCardComponent,
    NgScrollbarModule,
    NewOrderListComponent,
    EarningSourceComponent,
    ReviewWidgetComponent,
  ],
})
export class MainComponent implements OnInit {
  public areaChartOptions!: Partial<ChartOptions>;
  public barChartOptions!: Partial<ChartOptions>;
  public smallBarChart!: Partial<ChartOptions>;
  public smallAreaChart!: Partial<ChartOptions>;
  public smallColumnChart!: Partial<ChartOptions>;
  public smallLineChart!: Partial<ChartOptions>;

  public sampleData = [
    31, 40, 28, 44, 60, 55, 68, 51, 42, 85, 77, 31, 40, 28, 44, 60, 55,
  ];

  breadscrums = [
    {
      title: 'Dashboad',
      items: ['Home'],
      active: 'Dashboard',
    },
  ];
  constructor() {
    //constructor
  }

  ngOnInit() {
    this.cardChart1();
    this.cardChart2();
    this.cardChart3();
    this.cardChart4();
    this.chart1();
    this.chart2();
  }
  private cardChart1() {
    this.smallBarChart = {
      chart: {
        type: 'bar',
        width: 200,
        height: 50,
        sparkline: {
          enabled: true,
        },
      },
      plotOptions: {
        bar: {
          columnWidth: '40%',
        },
      },
      series: [
        {
          name: 'income',
          data: this.sampleData,
        },
      ],
      tooltip: {
        theme: 'dark',
        fixed: {
          enabled: false,
        },
        x: {
          show: false,
        },
        y: {},
        marker: {
          show: false,
        },
      },
    };
  }
  private cardChart2() {
    this.smallAreaChart = {
      series: [
        {
          name: 'order',
          data: this.sampleData,
        },
      ],
      chart: {
        type: 'area',
        height: 50,
        width: '100%',
        sparkline: {
          enabled: true,
        },
      },
      stroke: {
        curve: 'straight',
      },
      colors: ['#00E396'],
      tooltip: {
        theme: 'dark',
        fixed: {
          enabled: false,
        },
        x: {
          show: false,
        },
        marker: {
          show: false,
        },
      },
      xaxis: {
        labels: {
          show: false,
        },
      },
      legend: {
        show: false,
      },
      yaxis: {
        show: false,
      },
      grid: {
        show: false,
      },
    };
  }
  private cardChart3() {
    this.smallColumnChart = {
      chart: {
        type: 'bar',
        width: 200,
        height: 50,
        sparkline: {
          enabled: true,
        },
      },
      plotOptions: {
        bar: {
          columnWidth: '40%',
        },
      },
      series: [
        {
          name: 'income',
          data: this.sampleData,
        },
      ],

      tooltip: {
        theme: 'dark',
        fixed: {
          enabled: false,
        },
        x: {
          show: false,
        },
        y: {},
        marker: {
          show: false,
        },
      },
    };
  }
  private cardChart4() {
    this.smallLineChart = {
      series: [
        {
          name: 'Users',
          data: this.sampleData,
        },
      ],
      chart: {
        type: 'line',
        height: 50,
        sparkline: {
          enabled: true,
        },
      },
      stroke: {
        curve: 'straight',
        colors: ['#FEB019'],
        width: 4,
      },
      tooltip: {
        theme: 'dark',
        fixed: {
          enabled: false,
        },
        x: {
          show: false,
        },
        marker: {
          show: false,
        },
      },
      xaxis: {
        labels: {
          show: false,
        },
      },
      legend: {
        show: false,
      },
      yaxis: {
        show: false,
      },
      grid: {
        show: false,
      },
    };
  }

  private chart1() {
    this.areaChartOptions = {
      series: [
        {
          name: 'New Clients',
          data: [31, 40, 28, 51, 42, 85, 77],
        },
        {
          name: 'Old Clients',
          data: [11, 32, 45, 32, 34, 52, 41],
        },
      ],
      chart: {
        height: 350,
        type: 'area',
        toolbar: {
          show: false,
        },
        foreColor: '#9aa0ac',
      },
      colors: ['#FC8380', '#6973C6'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        type: 'datetime',
        categories: [
          '2018-09-19',
          '2018-09-20',
          '2018-09-21',
          '2018-09-22',
          '2018-09-23',
          '2018-09-24',
          '2018-09-25',
        ],
      },
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'center',
        offsetX: 0,
        offsetY: 0,
      },
      grid: {
        show: true,
        borderColor: '#9aa0ac',
        strokeDashArray: 1,
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
          name: 'Project 1',
          data: [44, 55, 41, 37, 22, 43, 21],
        },
        {
          name: 'Project 2',
          data: [53, 32, 33, 52, 13, 43, 32],
        },
        {
          name: 'Project 3',
          data: [12, 17, 11, 9, 15, 11, 20],
        },
        {
          name: 'Project 4',
          data: [9, 7, 5, 8, 6, 9, 4],
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        foreColor: '#9aa0ac',
      },
      colors: ['#5048e5', '#f43f5e', '#3c6494', '#a5a5a5'],
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      stroke: {
        width: 1,
        colors: ['#fff'],
      },
      xaxis: {
        categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
        labels: {
          formatter: function (val: string) {
            return val + 'K';
          },
        },
      },
      yaxis: {
        title: {
          text: undefined,
        },
      },
      grid: {
        show: true,
        borderColor: '#9aa0ac',
        strokeDashArray: 1,
      },
      tooltip: {
        theme: 'dark',
        marker: {
          show: true,
        },
        y: {
          formatter: function (val: number) {
            return val + 'K';
          },
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX: 40,
      },
    };
  }

  // client details

  clientData = [
    {
      name: 'John Doe',
      email: 'xyz@email.com',
      status: 'Active',
      projectName: 'ERP System',
      img: 'assets/images/user/user1.jpg',
      actionLink: '#/admin/projects/edit',
    },
    {
      name: 'Sarah Smith',
      email: 'xyz@email.com',
      status: 'Inactive',
      projectName: 'Abc Website',
      img: 'assets/images/user/user2.jpg',
      actionLink: '#/admin/projects/edit',
    },
    {
      name: 'Airi Satou',
      email: 'xyz@email.com',
      status: 'Active',
      projectName: 'Android App',
      img: 'assets/images/user/user3.jpg',
      actionLink: '#/admin/projects/edit',
    },
    {
      name: 'Angelica Ramos',
      email: 'xyz@email.com',
      status: 'Active',
      projectName: 'Ios App',
      img: 'assets/images/user/user4.jpg',
      actionLink: '#/admin/projects/edit',
    },
    {
      name: 'Ashton Cox',
      email: 'xyz@email.com',
      status: 'Inactive',
      projectName: 'Java Website',
      img: 'assets/images/user/user5.jpg',
      actionLink: '#/admin/projects/edit',
    },
    {
      name: 'Cara Stevens',
      email: 'xyz@email.com',
      status: 'Active',
      projectName: 'Desktop App',
      img: 'assets/images/user/user6.jpg',
      actionLink: '#/admin/projects/edit',
    },
    {
      name: 'David Lee',
      email: 'david@email.com',
      status: 'Active',
      projectName: 'Machine Learning Project',
      img: 'assets/images/user/user7.jpg',
      actionLink: '#/admin/projects/edit',
    },
    {
      name: 'Olivia Green',
      email: 'olivia@email.com',
      status: 'Inactive',
      projectName: 'E-Commerce Website',
      img: 'assets/images/user/user8.jpg',
      actionLink: '#/admin/projects/edit',
    },
    {
      name: 'Michael Brown',
      email: 'michael@email.com',
      status: 'Active',
      projectName: 'Mobile Banking App',
      img: 'assets/images/user/user9.jpg',
      actionLink: '#/admin/projects/edit',
    },
    {
      name: 'Sophia Johnson',
      email: 'sophia@email.com',
      status: 'Inactive',
      projectName: 'Social Media Platform',
      img: 'assets/images/user/user10.jpg',
      actionLink: '#/admin/projects/edit',
    },
    {
      name: 'James White',
      email: 'james@email.com',
      status: 'Active',
      projectName: 'Cloud Computing System',
      img: 'assets/images/user/user11.jpg',
      actionLink: '#/admin/projects/edit',
    },
    {
      name: 'Liam Harris',
      email: 'liam@email.com',
      status: 'Inactive',
      projectName: 'Fitness App',
      img: 'assets/images/user/user2.jpg',
      actionLink: '#/admin/projects/edit',
    },
    {
      name: 'Emma Wilson',
      email: 'emma@email.com',
      status: 'Active',
      projectName: 'Educational Platform',
      img: 'assets/images/user/user3.jpg',
      actionLink: '#/admin/projects/edit',
    },
    {
      name: 'Noah Taylor',
      email: 'noah@email.com',
      status: 'Active',
      projectName: 'Artificial Intelligence',
      img: 'assets/images/user/user4.jpg',
      actionLink: '#/admin/projects/edit',
    },
    {
      name: 'Charlotte King',
      email: 'charlotte@email.com',
      status: 'Inactive',
      projectName: 'Blockchain App',
      img: 'assets/images/user/user5.jpg',
      actionLink: '#/admin/projects/edit',
    },
  ];

  clientColumnDefinitions = [
    { def: 'name', label: 'Name', type: 'text' },
    { def: 'email', label: 'Email', type: 'text' },
    { def: 'status', label: 'Status', type: 'badge' },
    { def: 'projectName', label: 'Project Name', type: 'text' },
    { def: 'actions', label: 'Actions', type: 'actionBtn' },
  ];

  // earning source

  sources = [
    {
      label: 'envato.com',
      percentage: 17,
      class: 'bg-green',
      labelClass: 'bg-green text-white',
    },
    {
      label: 'google.com',
      percentage: 27,
      class: 'bg-red',
      labelClass: 'bg-red text-white',
    },
    {
      label: 'yahoo.com',
      percentage: 25,
      class: 'bg-indigo',
      labelClass: 'bg-indigo text-white',
    },
    {
      label: 'store',
      percentage: 18,
      class: 'bg-orange',
      labelClass: 'bg-orange text-white',
    },
    {
      label: 'Others',
      percentage: 13,
      class: 'bg-dark',
      labelClass: 'bg-dark text-white',
    },
  ];

  // review list

  reviewList = [
    {
      name: 'Alis Smith',
      timeAgo: 'a week ago',
      rating: 3.5,
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel rutrum ex, at ornare mi. In quis scelerisque dui, eget rhoncus orci. Fusce et sodales ipsum. Nam id nunc euismod, aliquet arcu quis, mattis nisi.',
      imageUrl: 'assets/images/user/user1.jpg',
    },
    {
      name: 'John Dio',
      timeAgo: 'a week ago',
      rating: 2.5,
      comment:
        'Nam quis ligula est. Nunc sed risus non turpis tristique tempor. Ut sollicitudin faucibus magna nec gravida. Suspendisse ullamcorper justo vel porta imperdiet. Nunc nec ipsum vel augue placerat faucibus.',
      imageUrl: 'assets/images/user/user2.jpg',
    },
  ];
}

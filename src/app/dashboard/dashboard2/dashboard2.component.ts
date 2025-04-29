import { EChartsOption } from 'echarts';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NgScrollbar } from 'ngx-scrollbar';
import { NgxGaugeModule } from 'ngx-gauge';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { MatCardModule } from '@angular/material/card';
import { TableCardComponent } from '@shared/components/table-card/table-card.component';
import { RecentCommentsComponent } from '@shared/components/recent-comments/recent-comments.component';
import {
  TimelineItem,
  TimelineListComponent,
} from '@shared/components/timeline-list/timeline-list.component';
import { DocumentListComponent } from '@shared/components/document-list/document-list.component';
import { ReportCardWidgetComponent } from '@shared/components/report-card-widget/report-card-widget.component';

interface GaugeValues {
  [key: number]: number;
}

@Component({
  selector: 'app-dashboard2',
  templateUrl: './dashboard2.component.html',
  styleUrls: ['./dashboard2.component.scss'],
  imports: [
    BreadcrumbComponent,
    NgxEchartsDirective,
    NgxGaugeModule,
    NgScrollbar,
    MatButtonModule,
    MatCardModule,
    TableCardComponent,
    RecentCommentsComponent,
    TimelineListComponent,
    DocumentListComponent,
    ReportCardWidgetComponent,
  ],
  providers: [provideEcharts()],
})
export class Dashboard2Component implements OnInit {
  lineBarChart!: EChartsOption;
  ebarChart!: EChartsOption;
  percentageValue: (value: number) => string;
  gaugeValues: GaugeValues = {
    1: 100,
  };

  breadscrums = [
    {
      title: 'Dashboad',
      items: ['Home'],
      active: 'Dashboard 2',
    },
  ];

  constructor() {
    this.percentageValue = function (value: number): string {
      return `${Math.round(value)}`;
    };
  }

  markerConfig = {
    '0': { color: '#9aa0ac', size: 8, label: '0', type: 'line' },
    '15': { color: '#9aa0ac', size: 4, type: 'line' },
    '30': { color: '#9aa0ac', size: 8, label: '30', type: 'line' },
    '40': { color: '#9aa0ac', size: 4, type: 'line' },
    '50': { color: '#9aa0ac', size: 8, label: '50', type: 'triangle' },
    '60': { color: '#9aa0ac', size: 4, type: 'line' },
    '70': { color: '#9aa0ac', size: 8, label: '70', type: 'line' },
    '85': { color: '#9aa0ac', size: 4, type: 'line' },
    '100': { color: '#9aa0ac', size: 8, label: '100', type: 'line' },
  };

  ngOnInit() {
    this.lineChart();
    this.barChart();

    const updateValues = (): void => {
      this.gaugeValues = {
        1: Math.round(Math.random() * 100),
      };
    };

    const INTERVAL = 3000;

    setInterval(updateValues, INTERVAL);
    updateValues();
  }

  // Charts
  private lineChart() {
    // line bar chart
    this.lineBarChart = {
      grid: {
        top: '6',
        right: '0',
        bottom: '17',
        left: '25',
      },
      xAxis: {
        data: ['2014', '2015', '2016', '2017', '2018'],
        axisLine: {
          lineStyle: {
            color: '#eaeaea',
          },
        },
        axisLabel: {
          fontSize: 10,
          color: '#9aa0ac',
        },
      },
      tooltip: {
        show: true,
        showContent: true,
        alwaysShowContent: false,
        triggerOn: 'mousemove',
        trigger: 'axis',
      },
      yAxis: {
        splitLine: {
          lineStyle: {
            color: '#eaeaea',
          },
        },
        axisLine: {
          lineStyle: {
            color: '#eaeaea',
          },
        },
        axisLabel: {
          fontSize: 10,
          color: '#9aa0ac',
        },
      },
      series: [
        {
          name: 'sales',
          type: 'bar',
          data: [11, 14, 8, 16, 11, 13],
        },
        {
          name: 'profit',
          type: 'line',
          smooth: true,
          lineStyle: {
            width: 3,
            shadowColor: 'rgba(0,0,0,0.4)',
            shadowBlur: 10,
            shadowOffsetY: 10,
          },
          data: [10, 7, 17, 11, 15],
          symbolSize: 10,
        },
        {
          name: 'growth',
          type: 'bar',
          data: [10, 14, 10, 15, 9, 25],
        },
      ],
      color: ['#9f78ff', '#fa626b', '#32cafe'],
    };
  }

  private barChart() {
    this.ebarChart = {
      grid: { show: false },
      xAxis: {
        data: [
          '2007',
          '2008',
          '2009',
          '2010',
          '2011',
          '2012',
          '2013',
          '2014',
          '2015',
          '2016',
          '2017',
          '2018',
        ],
        show: false,
        axisLabel: {
          fontSize: 10,
          color: '#9aa0ac',
        },
      },
      tooltip: {
        show: true,
        showContent: true,
        alwaysShowContent: false,
        triggerOn: 'mousemove',
        trigger: 'axis',
      },
      yAxis: {
        axisLabel: {
          fontSize: 10,
          color: '#9aa0ac',
        },
        show: false,
        splitLine: {
          show: false,
        },
      },
      series: [
        {
          name: 'sales',
          type: 'bar',
          data: [13, 14, 10, 16, 11, 13, 13, 14, 10, 16, 11, 13],
          barMaxWidth: 10,
        },

        {
          name: 'growth',
          type: 'bar',
          data: [10, 14, 10, 15, 9, 25, 10, 14, 10, 15, 9, 25],
          barMaxWidth: 10,
        },
      ],
      color: ['#A3A09D', '#32cafe'],
    };
  }

  // Recent order data
  orderData = [
    {
      name: 'John Doe',
      item: 'iPhone X',
      status: 'Placed',
      quantity: 2,
      progress: 62, // Progress in percentage
      img: 'assets/images/user/user1.jpg',
      actionLink: '#/admin/orders/edit',
    },
    {
      name: 'Sarah Smith',
      item: 'Pixel 2',
      status: 'Shipped',
      quantity: 1,
      progress: 40,
      img: 'assets/images/user/user2.jpg',
      actionLink: '#/admin/orders/edit',
    },
    {
      name: 'Airi Satou',
      item: 'OnePlus',
      status: 'Pending',
      quantity: 2,
      progress: 72,
      img: 'assets/images/user/user3.jpg',
      actionLink: '#/admin/orders/edit',
    },
    {
      name: 'Angelica Ramos',
      item: 'Galaxy',
      status: 'Delivered',
      quantity: 3,
      progress: 95,
      img: 'assets/images/user/user4.jpg',
      actionLink: '#/admin/orders/edit',
    },
    {
      name: 'Ashton Cox',
      item: 'Moto Z2',
      status: 'Placed',
      quantity: 4,
      progress: 87,
      img: 'assets/images/user/user5.jpg',
      actionLink: '#/admin/orders/edit',
    },
    {
      name: 'Cara Stevens',
      item: 'Nokia',
      status: 'Placed',
      quantity: 6,
      progress: 62,
      img: 'assets/images/user/user6.jpg',
      actionLink: '#/admin/orders/edit',
    },
    {
      name: 'David Lee',
      item: 'MacBook Pro',
      status: 'Shipped',
      quantity: 1,
      progress: 50,
      img: 'assets/images/user/user7.jpg',
      actionLink: '#/admin/orders/edit',
    },
    {
      name: 'Olivia Green',
      item: 'Samsung Note 20',
      status: 'Delivered',
      quantity: 2,
      progress: 95,
      img: 'assets/images/user/user8.jpg',
      actionLink: '#/admin/orders/edit',
    },
    {
      name: 'Michael Brown',
      item: 'iPad Pro',
      status: 'Pending',
      quantity: 3,
      progress: 30,
      img: 'assets/images/user/user9.jpg',
      actionLink: '#/admin/orders/edit',
    },
    {
      name: 'Sophia Johnson',
      item: 'Google Pixel 6',
      status: 'Shipped',
      quantity: 2,
      progress: 60,
      img: 'assets/images/user/user10.jpg',
      actionLink: '#/admin/orders/edit',
    },
    {
      name: 'James White',
      item: 'Huawei P30',
      status: 'Placed',
      quantity: 1,
      progress: 90,
      img: 'assets/images/user/user11.jpg',
      actionLink: '#/admin/orders/edit',
    },
  ];

  orderColumnDefinitions = [
    { def: 'name', label: 'Name', type: 'text' },
    { def: 'item', label: 'Item', type: 'text' },
    { def: 'status', label: 'Status', type: 'badge' },
    { def: 'quantity', label: 'Quantity', type: 'number' },
    { def: 'progress', label: 'Progress', type: 'progressBar' },
    { def: 'actions', label: 'Actions', type: 'actionBtn' },
  ];

  //recent comments

  comments = [
    {
      name: 'Dr. Airi Satou',
      message: 'Lorem ipsum dolor sit amet, id quo eruditi eloquentiam.',
      timestamp: '7 hours ago',
      imgSrc: 'assets/images/user/user6.jpg',
      colorClass: 'col-green',
    },
    {
      name: 'Dr. Sarah Smith',
      message: 'Lorem ipsum dolor sit amet, id quo eruditi eloquentiam.',
      timestamp: '1 hour ago',
      imgSrc: 'assets/images/user/user4.jpg',
      colorClass: 'color-primary col-indigo',
    },
    {
      name: 'Dr. Cara Stevens',
      message: 'Lorem ipsum dolor sit amet, id quo eruditi eloquentiam.',
      timestamp: 'Yesterday',
      imgSrc: 'assets/images/user/user3.jpg',
      colorClass: 'color-danger col-cyan',
    },
    {
      name: 'Dr. Ashton Cox',
      message: 'Lorem ipsum dolor sit amet, id quo eruditi eloquentiam.',
      timestamp: 'Yesterday',
      imgSrc: 'assets/images/user/user7.jpg',
      colorClass: 'color-info col-orange',
      noBorder: true,
    },
    {
      name: 'Dr. Mark Hay',
      message: 'Lorem ipsum dolor sit amet, id quo eruditi eloquentiam.',
      timestamp: '1 hour ago',
      imgSrc: 'assets/images/user/user9.jpg',
      colorClass: 'color-primary col-red',
    },
  ];

  // timeline list

  timelineData: TimelineItem[] = [
    {
      image: 'assets/images/user/user1.jpg',
      title: 'Lorem ipsum dolor sit amet, id quo eruditi.',
      timeAgo: '5 minutes ago',
    },
    {
      image: 'assets/images/user/user2.jpg',
      title: 'Lorem ipsum dolor sit amet, id quo eruditi.',
      timeAgo: '10 minutes ago',
    },
    {
      image: 'assets/images/user/user8.jpg',
      title: 'Lorem ipsum dolor sit amet, id quo eruditi.',
      timeAgo: '20 minutes ago',
    },
    {
      image: 'assets/images/user/user4.jpg',
      title: 'Lorem ipsum dolor sit amet, id quo eruditi.',
      timeAgo: '35 minutes ago',
    },
    {
      image: 'assets/images/user/user5.jpg',
      title: 'Lorem ipsum dolor sit amet, id quo eruditi.',
      timeAgo: '45 minutes ago',
    },
    {
      image: 'assets/images/user/user7.jpg',
      title: 'Lorem ipsum dolor sit amet, id quo eruditi.',
      timeAgo: '1 hour ago',
    },
    {
      image: 'assets/images/user/user3.jpg',
      title: 'Lorem ipsum dolor sit amet, id quo eruditi.',
      timeAgo: '2 hours ago',
    },
    {
      image: 'assets/images/user/user6.jpg',
      title: 'Lorem ipsum dolor sit amet, id quo eruditi.',
      timeAgo: '3 hours ago',
    },
  ];

  // document list

  documentList = [
    {
      title: 'Java Programming',
      type: '.doc',
      size: 4.3,
      icon: 'far fa-file-word',
      iconClass: 'primary-rgba text-primary',
      textClass: '',
    },
    {
      title: 'Angular Theory',
      type: '.xls',
      size: 2.5,
      icon: 'far fa-file-excel',
      iconClass: 'success-rgba text-success',
      textClass: '',
    },
    {
      title: 'Maths Sums Solution',
      type: '.pdf',
      size: 10.5,
      icon: 'far fa-file-pdf',
      iconClass: 'danger-rgba text-danger',
      textClass: '',
    },
    {
      title: 'Submit Science Journal',
      type: '.zip',
      size: 53.2,
      icon: 'far fa-file-archive',
      iconClass: 'info-rgba text-info',
      textClass: '',
    },
    {
      title: 'Marketing Instructions',
      type: '.doc',
      size: 5.3,
      icon: 'far fa-file-word',
      iconClass: 'primary-rgba text-primary',
      textClass: '',
    },
  ];
}

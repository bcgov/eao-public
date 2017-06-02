'use strict';

angular.module('projects').controller('controllerProjectsList2', controllerProjectsList2);

controllerProjectsList2.$inject = ['$scope', 'NgTableParams', 'Authentication', '_', 'ENV', 'PROJECT_TYPES', 'REGIONS', 'PROJECT_STATUS_PUBLIC', 'EAC_DECISIONS', '$filter'];
/* @ngInject */
function controllerProjectsList2($scope, NgTableParams, Authentication, _, ENV, PROJECT_TYPES, REGIONS, PROJECT_STATUS_PUBLIC, EAC_DECISIONS, $filter) {
	var projectList = this;

	$scope.environment = ENV;

	projectList.auth = Authentication;
	projectList.regionArray = [];
	projectList.statusArray = [];
	projectList.eacDecisionArray = [];
	projectList.typeArray = [];
	projectList.phaseArray = [];
	projectList.openPCPArray = [];

	$scope.$watch('projects', function(newValue) {
		if (newValue) {
			_.each(newValue, function(item) {
				if (item.openCommentPeriod === "Unpublished") {
					item.openCommentPeriod = "";
				}
			});

			if ($scope.$parent.filterObj) {
				projectList.tableParams = new NgTableParams ({
					count: 10,
					filter: $scope.$parent.filterObj
				}, {dataset: newValue});
			} else {
				projectList.tableParams = new NgTableParams ({
					count: 10,
				}, {dataset: newValue});
			}
		}
	});

	$scope.showProjectListFilters = false;
	$scope.toggleProjectListFilters = function () {
        $scope.showProjectListFilters = !$scope.showProjectListFilters;
    };
}



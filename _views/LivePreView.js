/**
 Live preview  in StackView views
 @class LivePreView
 @constructor
 @return {Object} instantiated WaitView
 **/
define(['jquery', 'backbone'], function ($, Backbone) {

    BB.SERVICES.LIVEPREVIEW = 'LivePreView';

    var LivePreView = Backbone.View.extend({

        /**
         Constructor
         @method initialize
         **/
        initialize: function () {
            var self = this;
            BB.comBroker.setService(BB.SERVICES['LIVEPREVIEW'], self);
            self.m_lastLaunce = undefined;
            self.m_sceneID = undefined;
            self.m_campaignBoardNativeID = undefined;
            self.m_campaignTimelineNativeID = undefined;
            // self.url = '<IFRAME ID="frm" src="https://neptune.signage.me/WebService/SignagePlayerApp.html?eri=f7bee07a7e79c8f1d7951b4d24de4713c22f160f5ebf607c&playerParams=137c997e8f08050f9ab8a92fedd119788cccdf47&banner=1" WIDTH="100%" HEIGHT="100%"></IFRAME>';
            self._listenReplay();
            self._listenStop();
            self._listenExit();
        },

        /**
         Listen to live preview replay
         @method _listenReplay
         **/
        _listenReplay: function () {
            var self = this;
            $(Elements.PLAYER_PREVIEW_REPLAY, self.$el).on('click', function () {
                self.m_lastLaunce();
            });
        },

        /**
         Listen to live preview stop
         @method _listenStop
         **/
        _listenStop: function () {
            var self = this;
            $(Elements.PLAYER_PREVIEW_STOP, self.$el).on('click', function () {
                $(Elements.IFRAME_EMBEDDED).attr('src','');
            });
        },

        /**
         Listen to live preview exit
         @method _listenExit
         **/
        _listenExit: function () {
            var self = this;
            $(Elements.PLAYER_PREVIEW_EXIT, self.$el).on('click', function () {
                $(Elements.IFRAME_EMBEDDED).attr('src','');
                var appEntryFaderView = BB.comBroker.getService(BB.SERVICES['APP_ENTRY_FADER_VIEW']);
                appEntryFaderView.selectView(Elements.APP_CONTENT);
            });
        },

        /**
         Listen to live preview launch
         @method launch
         **/
        launchScene: function(i_sceneID) {
            var self = this;
            if (_.isUndefined(i_sceneID) && _.isUndefined(self.m_sceneID))
                return;
            self.m_sceneID = i_sceneID != undefined ? i_sceneID : self.m_sceneID;
            self.m_lastLaunce = self.launchScene;
            var appEntryFaderView = BB.comBroker.getService(BB.SERVICES['APP_ENTRY_FADER_VIEW']);
            appEntryFaderView.selectView(Elements.LIVE_PREVIEW);
            var url = pepper.livePreviewScene(self.m_sceneID);
            $(Elements.IFRAME_EMBEDDED).attr('src',url);
            log(url);
            // $(Elements.IFRAME_EMBEDDED).attr('src','https://neptune.signage.me/WebService/SignagePlayerApp.html?eri=f7bee07a7e79c8f1d7951b4d24de4713c22f160f5ebf607c&playerParams=137c997e8f08050f9ab8a92fedd119788cccdf47&banner=1');
        },

        /**
         Listen to live preview launch
         @method launch
         **/
        launchTimelime: function(i_campaignBoardNativeID, i_campaignTimelineNativeID) {
            var self = this;
            if (_.isUndefined(i_campaignTimelineNativeID) && _.isUndefined(self.m_campaignTimelineNativeID))
                return;
            self.m_campaignTimelineNativeID = i_campaignTimelineNativeID != undefined ? i_campaignTimelineNativeID : self.m_campaignTimelineNativeID;
            self.m_campaignBoardNativeID = i_campaignBoardNativeID != undefined ? i_campaignBoardNativeID : self.m_campaignBoardNativeID;
            self.m_lastLaunce = self.launchTimelime;
            var appEntryFaderView = BB.comBroker.getService(BB.SERVICES['APP_ENTRY_FADER_VIEW']);
            appEntryFaderView.selectView(Elements.LIVE_PREVIEW);
            var url = pepper.livePreviewTimeline(self.m_campaignBoardNativeID,  self.m_campaignTimelineNativeID);
            $(Elements.IFRAME_EMBEDDED).attr('src',url);
            log(url);
            // $(Elements.IFRAME_EMBEDDED).attr('src','https://neptune.signage.me/WebService/SignagePlayerApp.html?eri=f7bee07a7e79c8f1d7951b4d24de4713c22f160f5ebf607c&playerParams=137c997e8f08050f9ab8a92fedd119788cccdf47&banner=1');
        },

        /**
         Listen to live preview launch
         @method launch
         **/
        launchCampaign: function(i_campaignBoardNativeID) {
            var self = this;
            if (_.isUndefined(i_campaignBoardNativeID) && _.isUndefined(self.m_campaignBoardNativeID))
                return;
            self.m_campaignBoardNativeID = i_campaignBoardNativeID != undefined ? i_campaignBoardNativeID : self.m_campaignBoardNativeID;
            self.m_lastLaunce = self.launchCampaign;
            var appEntryFaderView = BB.comBroker.getService(BB.SERVICES['APP_ENTRY_FADER_VIEW']);
            appEntryFaderView.selectView(Elements.LIVE_PREVIEW);
            var url = pepper.livePreviewCampaign(self.m_campaignBoardNativeID)
            $(Elements.IFRAME_EMBEDDED).attr('src',url);
            log(url);
            // $(Elements.IFRAME_EMBEDDED).attr('src','https://neptune.signage.me/WebService/SignagePlayerApp.html?eri=f7bee07a7e79c8f1d7951b4d24de4713c22f160f5ebf607c&playerParams=137c997e8f08050f9ab8a92fedd119788cccdf47&banner=1');
        }
    });

    return LivePreView;

});


// @flow
import { Analytics } from './analytics';

export type FlowNodeSet = {
  type: 'node_set',
  selector: string,
  prop: string,
  value: string,
};

export type NavFilter = {
  label: string,
  url: string,
};

export type FlowNodeClick = {
  type: 'node_click',
  selector: string,
};

export type CartFlowAction = FlowNodeSet | FlowNodeClick;

export type VisibilityAttributesConfig = {
  device: 'mobile' | 'desktop' | 'all',
  elementSelector: string,
  triggerType: 'attributes',
  triggerName: string, // "aria-hidden", "class", etc..
  triggerValue: string, // "false", "some_class_name", etc...
};

export type VisibilityURLConfig = {
  device: 'mobile' | 'desktop' | 'all',
  triggerType: 'url',
  triggerValue: string, // url string
};

export type VisibilityMountConfig = {
  device: 'mobile' | 'desktop' | 'all',
  elementSelector: string,
  triggerType: 'mount',
};

export type VisibilityConfig =
  | VisibilityAttributesConfig
  | VisibilityURLConfig
  | VisibilityMountConfig;

// PartialAppConfig is meant to be deep-merged into AppConfig to override
// specific properties for an experiment. It should really be the same as
// AppConfig, except with most of its top-level properties removed and with all
// properties (recursively) made optional. I'm not sure if there's a good way
// to make Flow do this.
export type PartialAppConfig = { [string]: any };

// Configuration for a particular experiment, with the overriding config values
// for each possible value of the experiment flag
export type ExperimentConfig = {
  name: string,
  values: { [string]: PartialAppConfig },
};
export type AppLayoutType = 'embedded';

export type ConstraintInitialSuggestion = {
  type?: 'new_facet_constraint',
  label: string,
  value: string,
  facet: string,
  answer?: string,
  imageUrl?: string,
};

export type ManyConstraintsInitialSuggestion = {
  type: 'many_new_facet_constraints',
  label: string,
  constraints: { [string]: string },
  answer?: string,
  imageUrl?: string,
};

export type TextInitialSuggestion = {
  type: 'visitor_text',
  label: string,
  text: string,
};

export type InitialSuggestion =
  | ConstraintInitialSuggestion
  | ManyConstraintsInitialSuggestion
  | TextInitialSuggestion;

// Alternative initial suggestions for a particular URL
export type AltInitialSuggestions = {
  pattern: string, // A regular expression
  extraConstraints?: { [string]: string },
  suggestions: Array<InitialSuggestion>,
};

// Configurable server behavior settings are likely to be changing rapidly for
// now; maybe later we'll make this a stricter type.
export type ServerBehavior = {
  expand_single_product: boolean,
  fetch_provider: 'socket' | 'REST' | 'backoff',
};

export type AppConfigFlags = {
  sourcePDP: boolean,
};

export type AppLanguage = {
  buttons: {
    cart: string,
    reorder: string,
  },
};

export type NewFacetConstraintPayload = {
  type: 'new_facet_constraint',
  facet: string,
  value: string,
  answer?: string,
};

export type ManyNewFacetConstraintsPayload = {
  type: 'many_new_facet_constraints',
  constraints: { [string]: string },
  answer?: string,
};

export type RemoveFacetConstraintPayload = {
  type: 'remove_facet_constraint',
  facet: string,
  value: string,
};

export type RemoveKeywordConstraintPayload = {
  type: 'remove_keyword_constraint',
  keyword: string,
};

export type NewKeywordConstraintPayload = {
  type: 'new_keyword_constraint',
  keyword: string,
};

export type ClearFacetConstraintsPayload = {
  type: 'clear',
  search?: boolean,
};

export type QuestionAnswerPayload = {
  type: 'question_answer',
  question: string,
  answer: string,
};

export type RestorePreviousStateConstraintPayload = {
  type: 'restore_previous_state',
};

export type GetCardsPayload = {
  type: 'get_cards_payload',
  next_page_title: string,
  count: number,
  id: string,
  offset: number,
  source_id: string,
  facet_value_pairs: Array<{ [string]: string }>,
};

export type RestorePreviousStatePayload = {
  constraints: Array<any>,
  type: 'restore_previous_state',
};

export type TimelineStateFrame = {
  title: string,
  constraints: Array<any>,
};

export type FeedConstraintTimeline = {
  type: 'constraint timeline',
  current_index: number,
  state_frames: Array<TimelineStateFrame>,
};

export type RestoreTimelinePayload = {
  n: number,
  timeline: FeedConstraintTimeline,
  type: 'restore_previous_state',
};

export type InputCardPayload = {
  timeline: FeedConstraintTimeline,
  text: string,
  type: 'text_message_payload',
};

export type ConstraintPayload =
  | NewFacetConstraintPayload
  | ManyNewFacetConstraintsPayload
  | RemoveFacetConstraintPayload
  | RemoveKeywordConstraintPayload
  | NewKeywordConstraintPayload
  | ClearFacetConstraintsPayload
  | QuestionAnswerPayload
  | RestorePreviousStateConstraintPayload
  | GetCardsPayload
  | RestorePreviousStatePayload
  | RestoreTimelinePayload;

export type FacetButton = {
  id: string,
  label: string,
  payload: ConstraintPayload,
  action_language: string,
};

export type ConstraintButton = {
  type: 'constraint',
  id: string,
  label: string,
  payload: ConstraintPayload,
  action_language: string,
};

export type SuggestionButton = {
  type: 'suggestion',
  id: string,
  label: string,
  payload: ConstraintPayload,
  action_language: string,
  selected?: boolean,
};

export type PlainText = {
  type: 'plain',
  text: string,
};

export type ConstraintOrText = ConstraintButton | PlainText;

export type SuggestionOrText = SuggestionButton | PlainText;

export type Product = {
  body: string,
  body_html: string,
  handle: string,
  title: string,
  sku: string,
  product_url: string,
  image_url: string,
  price: string,
  created_at: string,
  variant_id: number,
  product_id: number | string,
  product_metadata: { [string]: number | string },
  subtitle: string,
  summary: string,
  number_of_variants: number,
  attributes: Array<{
    name: string,
    value: any,
  }>,
  variant_attributes: Array<{
    name: string,
    value: any,
  }>,
  product_attributes: Array<{
    name: string,
    value: string,
  }>,
};

export type ProductMatchTerms = Array<{
  field: string,
  text: string,
}>;

export type FeedCardTypes =
  | 'category_card'
  | 'product_detail_card'
  | 'question_answer_card'
  | 'facet_value_card'
  | 'pagination_card';

export type FeedCardSourceInfo = {
  card_type: FeedCardTypes,
  card_id: string,
  title: string,
  button_id: string,
};

export type WelcomeCard = {
  id: string,
  image_url: string,
  source_id: string,
  headline: string,
  subtext: string,
  type: 'welcome_card',
  payload: GetCardsPayload,
  render_key: string,
};

export type CardLayoutState = '1x1' | '1x2' | '2x2' | '1x1_plain' | 'full_w';

export type CategoryCard = {
  id: string,
  image_url: string,
  title: string,
  title_prefix: {
    text: string,
    icon: 'arrow',
  },
  type: 'category_card',
  source_id: string,
  layout_state: CardLayoutState,
  payload: GetCardsPayload,
  render_key: string,
};

export type ProductReviewInfo = {
  review_source: string,
  image_url: string,
  stars: number,
  review_text: string,
  product_title: string,
};

export type ProducDetailsCard = {
  id: string,
  product: Product,
  source_id: string,
  layout_state: CardLayoutState,
  type: 'product_detail_card',
  product_type: string,
  payload: ConstraintPayload,
  review_info?: ProductReviewInfo,
  product_recommendation_type: string,
  start_link?: boolean,
  two_col_empty?: boolean,
  end_link?: boolean,
  render_key: string,
};

export type ReviewCard = {
  id: string,
  source_id: string,
  type: 'review_card',
  layout_state: CardLayoutState,
  review_info: ProductReviewInfo,
  related_card_id?: string,
  start_link?: boolean,
  two_col_empty?: boolean,
  end_link?: boolean,
  render_key: string,
};

export type ReviewCardDefault = {
  id: string,
  source_id: string,
  type: 'review_default_card',
  layout_state: CardLayoutState,
  review_info: ProductReviewInfo,
  related_card_id?: string,
  start_link?: boolean,
  two_col_empty?: boolean,
  end_link?: boolean,
  render_key: string,
};

export type QuestionCard = {
  id: string,
  title: string,
  question: string,
  layout_state: CardLayoutState,
  type: 'question_answer_card',
  answer: string,
  payload: GetCardsPayload,
  render_key: string,
};

export type QuestionCardDefault = {
  id: string,
  title: string,
  question: string,
  layout_state: CardLayoutState,
  type: 'question_answer_default_card',
  answer: string,
  related_card_id?: string,
  start_link?: boolean,
  two_col_empty?: boolean,
  end_link?: boolean,
  render_key: string,
};

export type QuestionRevealCard = {
  id: string,
  title: string,
  type: 'question_answer_reveal_card',
  questions: [
    {
      question: string,
      answer: string,
    }
  ],
  render_key: string,
};

export type FacetValueCard = {
  id: string,
  title: string,
  source_id: string,
  type: 'facet_value_card',
  facet_value_buttons: Array<SuggestionButton>,
  render_key: string,
};

export type PaginationCard = {
  id: string,
  source_id: string,
  type: 'pagination_card',
  payload: GetCardsPayload,
  render_key: string,
};

export type TextInputCard = {
  id: string,
  source_id: string,
  payload: {
    timeline: FeedConstraintTimeline,
    text?: string,
  },
  type: 'text_input_card',
  render_key: string,
};

export type HeaderCard = {
  id: string,
  header_info: { [string]: any },
  page_title: string,
  source_id: string,
  type: 'header_card',
  payload: RestoreTimelinePayload,
  render_key: string,
};

export type BannerCard = {
  id: string,
  layout_state: CardLayoutState,
  banner_info: {
    title: string,
    description: string,
    image_url: string,
    button_text: string,
    type: 'content' | 'image',
    content_html?: string,
  },
  source_id: string,
  type: 'banner_card',
  render_key: string,
};

export type ServiceCardActionClick = {
  type: 'node_click',
  node_selector: string,
};

export type ServiceCardActionURL = {
  type: 'open_url',
  url: string,
};

export type ServiceCardAction = ServiceCardActionClick | ServiceCardActionURL;

export type AspectRatio = '16:9' | '9:16' | 'default';

export type CustomerServiceCard = {
  id: string,
  source_id: string,
  type: 'customer_service_card',
  title: string,
  body: string,
  button_text: string,
  action: ServiceCardAction,
  lca: Array<string>,
  render_key: string,
};

export type SocialContentCard = {
  id: string,
  source_id: string,
  type: 'social_content_card',
  content_type: 'image' | 'youtube' | 'instagram' | 'tiktok',
  iframe_url: string,
  image_url: string,
  caption_html: string,
  related_card_id?: string,
  start_link?: boolean,
  two_col_empty?: boolean,
  end_link?: boolean,
  render_key: string,
};

export type BlogCard = {
  id: string,
  source_id: string,
  type: 'blog_card',
  image_url: string,
  title: string,
  summary: string,
  content_html: string,
  content_url: string,
  render_key: string,
};

export type StoryCard = {
  id: string,
  source_id: string,
  type: 'storycard',
  image_url: string,
  video_link_url: string,
  title: string,
  description: string,
  content_html: string,
  layout_state: 'horizontal' | 'vertical' | 'backdrop',
  render_key: string,
};

export type ProductSummaryCard = {
  id: string,
  source_id: string,
  type: 'product_summary_card',
  product: Product,
  product_recommendation_type: string,
  layout_state: CardLayoutState,
  render_key: string,
};

export type ProductDescriptionCard = {
  id: string,
  source_id: string,
  type: 'product_description_card',
  title: string,
  description: string,
  layout_state: CardLayoutState,
  render_key: string,
};

export type ProductImageCard = {
  id: string,
  source_id: string,
  type: 'product_image_card',
  image_url: string,
  image_position: string,
  layout_state: CardLayoutState,
  render_key: string,
};

export type ProductImageCarouselCard = {
  id: string,
  source_id: string,
  type: 'product_image_carousel_card',
  image_urls: Array<string>,
  layout_state: CardLayoutState,
  render_key: string,
};

export type VideoCard = {
  id: string,
  lca: Array<string>,
  source_id: string,
  type: 'video_card',
  video_link_url: string,
  layout_state: CardLayoutState,
  aspect_ratio: AspectRatio,
  related_card_id?: string,
  start_link?: boolean,
  two_col_empty?: boolean,
  end_link?: boolean,
  render_key: string,
};

export type CouponCardInfo = {
  title: string,
  description: string,
  code: string,
  discount: any,
  banner?: string,
  render_key: string,
};

export type CouponCard = {
  id: string,
  source_id: string,
  type: 'coupon_card',
  image_url: string,
  coupon_info: CouponCardInfo,
  render_key: string,
};

export type ProductVaraint = {
  product: Product,
  variant_properties: string,
};

export type ProductVariants = {
  [string]: ProductVaraint,
};

export type ProductVariantCard = {
  id: string,
  source_id: string,
  type: 'variant_group_card',
  layout_state: CardLayoutState,
  variants_info: ProductVariants,
  title: string,
  image_url: string,
  payload: ConstraintPayload,
  variant_type?: 'default' | 'properties',
  product_recommendation_type: string,
  render_key: string,
};

export type IntroductionCard = {
  id: string,
  source_id: string,
  type: 'introduction_card',
  introduction_info: {
    headline: string,
    subtitle: string,
  },
  layout_state: CardLayoutState,
  render_key: string,
};

export type ComparisonCard = {
  id: string,
  source_id: string,
  type: 'comparison_card',
  comparison_info: {
    card_title: string,
    title: string,
    description: string,
  },
  products: Array<Product>,
  render_key: string,
};

type SkeletonCard = {
  id: string,
  type: 'skeleton_card',
  render_key: string,
};

export type MerchCardVideo = {
  id: string,
  type: 'merch_card_video',
  source_id: string,
  render_key: string,
};

export type MerchCardReview = {
  id: string,
  type: 'merch_card_review',
  source_id: string,
  render_key: string,
};

export type MerchCardQA = {
  id: string,
  type: 'merch_card_qa',
  source_id: string,
  render_key: string,
};

export type FeedCard =
  | CategoryCard
  | ProducDetailsCard
  | QuestionCard
  | QuestionCardDefault
  | QuestionRevealCard
  | FacetValueCard
  | PaginationCard
  | TextInputCard
  | HeaderCard
  | BannerCard
  | WelcomeCard
  | ReviewCard
  | ReviewCardDefault
  | CustomerServiceCard
  | SocialContentCard
  | BlogCard
  | ProductSummaryCard
  | ProductDescriptionCard
  | ProductImageCard
  | ProductImageCarouselCard
  | VideoCard
  | CouponCard
  | ProductVariantCard
  | IntroductionCard
  | ComparisonCard
  | SkeletonCard
  | MerchCardVideo
  | MerchCardReview
  | MerchCardQA
  | StoryCard;

export type FeedPayloadCard =
  | CategoryCard
  | QuestionCard
  | ProducDetailsCard
  | HeaderCard
  | ProductVariantCard;

export type BotToVisitorMessage = {
  id: string,
  type: 'bot_message',
  constraint_text?: Array<ConstraintOrText>,
  products?: Array<Product>,
  product_scores?: {
    product_score_set: Array<{
      variant_id: number,
      score: number,
      matched_terms: ProductMatchTerms,
    }>,
  },
  suggestions?: Array<SuggestionOrText>,
  answer?: string,
  cards?: Array<FeedCard>,
};

export type BotPaginationMessage = {
  type: 'bot_message_pagination',
  cards: Array<FeedCard>,
};

export type BotMessage =
  | BotToVisitorMessage
  | BotPaginationMessage

// Visitor messsages
export type VisitorTextMessage = {|
  type: 'visitor_text',
  id: string,
  payload: InputCardPayload,
  server_behavior?: ServerBehavior,
  current_url?: string,
  source?: {
    message_id?: string,
    card_id: string,
  },
|};

export type InteractionSource = {
  message_id: string,
  button_id: string,
  card_id?: string,
};

export type VisitorButtonClick = {|
  type: 'visitor_button_click',
  id: string,
  source: InteractionSource,
  payload: ConstraintPayload,
  action_language: string,
  server_behavior?: ServerBehavior,
  current_url?: string,
|};

export type VisitorMessage = VisitorTextMessage | VisitorButtonClick;

export type ThreadMessage = BotMessage | VisitorMessage;

// Component entities
export type CallToActionCartAdd = {
  type: 'add_to_cart',
  product: Product,
};

export type CallToActionCartBuyNow = {
  type: 'buy_now',
  product: Product,
};

export type CallToActionClear = {
  type: 'clear_action_calls',
};

export type CallToActionCouponAdd = {
  type: 'add_coupon',
  couponInfo: CouponCardInfo,
};

export type CallToActionCouponRemove = {
  type: 'remove_coupon',
  couponInfo: CouponCardInfo,
};

export type CallToActionInteractiveMessage = {
  type: 'interactive_message',
  text: string,
};

export type CallToAction =
  | CallToActionCartAdd
  | CallToActionCartBuyNow
  | CallToActionClear
  | CallToActionCouponAdd
  | CallToActionCouponRemove
  | CallToActionInteractiveMessage;

export type AddToCartCB = (
  product: Product,
  action?: 'cart' | 'buy-now'
) => void | Promise<void>;

export type ProductConfig = {
  enableRating: boolean,
  enableCart: boolean,
  enableBuyNow: boolean,
  enableReorder: boolean,
  enableShipping: boolean,
  enableSubTitle: boolean,
  enableVendor: boolean,
  enableOptions: boolean,
  enableForceOptions: boolean,
  enableBackupImage: boolean,
  enableHighlights: boolean,
  enableVariantInfo: boolean,
  enableCurrency: boolean,
  enableSubscriptions: boolean,
};

export type CallbackNodeConfig = {
  type: 'update' | 'set',
  selector: string,
  prefix?: string,
  suffix?: string,
  attribute?: string,
  suffixForm?: string,
  value?: string,
};

export type GoogleAnalyticsConfig = {
  enabled?: boolean, // Enables pass-through if gtag is installed on page
  sendTo?: string, // Overrides destination property for events
  debugMode?: boolean, // Sends events in debug mode
  customParameters?: {
    [string]: { [string]: string },
  },
  createPurchaseEvent?: boolean,
  createPageView?: boolean,
  eventTypes?: Array<string>,
};

export type RecordingConfig = {
  enabled?: boolean,
  enableOn?: string,
};

export type TrackingRuleTypes = 'click' | 'view' | 'touch';

export type TrackingRuleView = {
  urlPattern: string,
  device: 'mobile' | 'desktop' | 'all',
  elementSelector: string,
  container: string,
  alias: string,
  trackingType: 'view',
};

export type TrackingRuleClick = {
  urlPattern: string,
  device: 'mobile' | 'desktop' | 'all',
  elementSelector: string,
  alias: string,
  trackingType: 'click',
};

export type TrackingRuleScroll = {
  urlPattern: string,
  device: 'mobile' | 'desktop' | 'all',
  elementSelector: string,
  alias: string,
  trackingType: 'scroll',
};

export type TrackingRuleTouch = {
  urlPattern: string,
  device: 'mobile' | 'desktop' | 'all',
  elementSelector: string,
  alias: string,
  trackingType: 'touch',
};

export type TrackingRulePageView = {
  urlPattern: string,
  device: 'mobile' | 'desktop' | 'all',
  alias: string,
  trackingType: 'pageView',
};

export type TrackingRuleGlobalClick = {
  urlPattern: string,
  device: 'mobile' | 'desktop' | 'all',
  trackingType: 'globalClick',
  eventType: 'click' | 'mousedown' | 'touchstart',
  elementSelector: string,
  alias: string,
  targetSelectors: Array<{
    selector: string,
    alias: string,
  }>,
};

export type TrackingRuleGlobalView = {
  urlPattern: string,
  device: 'mobile' | 'desktop' | 'all',
  trackingType: 'globalView',
  container: string,
  alias: string,
  targetSelectors: Array<{
    selector: string,
    alias: string,
  }>,
};

export type TrackingRuleGlobalInfo = {
  urlPattern: string,
  device: 'mobile' | 'desktop' | 'all',
  trackingType: 'globalInfo',
  alias: string,
  targetSelectors: Array<{
    selector: string,
    alias: string,
    extractors: Array<{
      attribute: string,
    }>,
  }>,
};

export type TrackingRule =
  | TrackingRuleView
  | TrackingRuleClick
  | TrackingRuleTouch
  | TrackingRulePageView
  | TrackingRuleScroll
  | TrackingRuleGlobalClick
  | TrackingRuleGlobalView
  | TrackingRuleGlobalInfo;

export type AppMerchantConfig = {
  enabled: boolean,
  sequenceLines: boolean,
  mode: 'settings' | 'preview',
};

export type SectionRuleUpdate = {
  type: 'section_update',
  sections: string[],
  urlPath: string,
  action: 'update',
  actionSelectors: string[],
  actionTarget: string,
};

export type SectionRuleAppend = {
  type: 'section_append',
  sections: string[],
  urlPath: string,
  action: 'push' | 'unshift',
  actionSelectors: string[],
  actionTarget: string,
};

export type SectionRule = SectionRuleUpdate | SectionRuleAppend;

export type SectionCfg = {
  enabled: boolean,
  rules: SectionRule[],
};

export type SectionResponse = Promise<{
  [key: string]: string | null,
}>;

export type PagePattern = {
  pattern: string,
  type: 'include' | 'exclude',
};

export type AppPageActions = {
  hide: Array<string>,
};

export type SectionConfig = {
  type: 'inner' | 'outer',
  extractors: {
    [string]: Array<{
      selector: string,
      type: string,
      attribute: string,
    }>,
  },
};

export type AppGridConfig = {
  enabled: boolean,
  mobile: {
    columns: number,
  },
  desktop: {
    columns: number,
  },
};

export type AppConfig = {
  organizationId: string,
  access_token: string,
  serverURL: string,
  enabled: boolean,
  experiment?: string, // PostHog experiment name
  experiments?: Array<ExperimentConfig>,
  trafficFraction?: number,
  container?: HTMLElement | string | Array<string>, // HTML element or a DOM query selector
  serverBehavior?: ServerBehavior,
  analytics?: {
    disableAll?: boolean,
    pagination?: {
      includeEvents?: boolean,
      allowedEvents?: Array<string>,
      trimLingerEvents?: boolean,
    },
    postHog?: {
      autocapture?: boolean,
      recording?: RecordingConfig,
    },
    googleAnalytics?: GoogleAnalyticsConfig | Array<GoogleAnalyticsConfig>,
    pgEvents: {
      enabled?: boolean,
      url?: string,
    },
  },
  design?: {
    layout?: AppLayoutType,
    merchant?: AppMerchantConfig,
    language?: AppLanguage,
    pageActions?: AppPageActions,
    pagination?: {
      enabled?: boolean,
      offset?: number,
      persistent?: boolean,
    },
    style?: {
      global?: string,
      merchant?: string,
      layout?: string,
      grid?: AppGridConfig,
    },
    flags?: {
      sourcePDP?: boolean,
    },
    container?: {
      style?: string,
    },
    rendering?: {
      context?: {
        [string]: {
          target: string,
          style: { [string]: any },
        },
      },
    },
    navigation?: {
      type?: 'default' | 'breadcrumbs',
    },
    product?: {
      enableRating?: boolean,
      enableCart?: boolean,
      enableBuyNow?: boolean,
      enableReorder?: boolean,
      enableShipping?: boolean,
      enableSubTitle?: boolean,
      enableForceOptions?: boolean,
      enableOptions?: boolean,
      enableVendor?: boolean,
      enableBackupImage?: boolean,
      enableHighlights?: boolean,
      enableVariantInfo?: boolean,
      enableCurrency?: boolean,
      enableSubscriptions?: boolean,
    },
    allowedPagePatterns?: Array<string>,
    pagePatterns?: Array<PagePattern>,
    coupon?: {
      [string]: CouponCardInfo,
    },
    embedded?: {
      scrollSource?: string,
      banner?: {
        visible?: boolean,
        type?: 'content' | 'image',
        content?: {
          title?: string,
          description?: string,
          image?: string,
        },
      },
      filters?: {
        visible?: boolean,
        navigation?: {
          title?: string,
          options?: Array<NavFilter>,
        },
      },
      menu?: {
        visible?: boolean,
      },
    },
    url?: {
      redirect?: boolean,
      target?: 'external' | 'self',
    },
    cart?: {
      type?: 'default' | 'open-url' | 'internal',
      sections?: string,
      callback?: string,
      cartURL?: string,
      cartFlow?: Array<CartFlowAction>,
      cartPDP: {
        enabled?: boolean,
      },
      callbackConfig?: {
        nodes?: Array<CallbackNodeConfig>,
      },
      checkout?: {
        type?: 'default' | 'node-click' | 'open-url',
        node?: string,
        url?: string,
      },
      sectionExtractor?: {
        selector?: string,
        attribute?: string,
      },
      sectionConfig: SectionConfig,
    },
    tracking?: {
      source?: {
        enabled?: boolean,
        rules?: Array<TrackingRule>,
      },
      feed?: {
        enabled?: boolean,
        metrics?: {
          enabled?: boolean,
          heatmap?: boolean,
          color_heatmap?: boolean,
          interval?: number,
        },
        thresholds?: Array<number>,
      },
    },
  },
  sections?: SectionCfg,
};

export type TrackingConfigSource = {
  enabled: boolean,
  rules: Array<TrackingRule>,
};

export type AppDesignProps = {
  layout: AppLayoutType,
  merchant: AppMerchantConfig,
  flags: AppConfigFlags,
  language: AppLanguage,
  pageActions: AppPageActions,
  pagination: {
    enabled: boolean,
    offset: number,
    persistent: boolean,
  },
  style: {
    global: string,
    merchant: string,
    layout: string,
    grid: AppGridConfig,
  },
  container: {
    style: string,
  },
  rendering: {
    context: {
      [string]: {
        target: string,
        style: { [string]: any },
      },
    },
  },
  navigation: {
    type: 'default' | 'breadcrumbs',
  },
  product: ProductConfig,
  allowedPagePatterns: Array<string>,
  pagePatterns: Array<PagePattern>,
  coupon: {
    [string]: CouponCardInfo,
  },
  embedded: {
    scrollSource: string,
    banner: {
      visible: boolean,
      type: 'content' | 'image',
      content: {
        title: string,
        description: string,
        image: string,
      },
    },
    filters: {
      visible: boolean,
      navigation: {
        title: string,
        options: Array<NavFilter>,
      },
    },
    menu: {
      visible: boolean,
    },
  },
  url: {
    redirect: boolean,
    target: 'external' | 'self',
  },
  cart: {
    type: 'default' | 'open-url' | 'internal' | 'external',
    sections: string,
    cartFlow: Array<CartFlowAction>,
    cartPDP: {
      enabled: boolean,
    },
    callback: string, // name of the callback function
    cartURL: string,
    callbackConfig: {
      nodes: Array<CallbackNodeConfig>,
    },
    checkout: {
      type: 'default' | 'node-click' | 'open-url',
      node: string,
      url: string,
    },
    sectionExtractor: {
      selector: string,
      attribute: string,
    },
    sectionConfig: SectionConfig,
  },
  tracking: {
    source: TrackingConfigSource,
    feed: {
      enabled: boolean,
      metrics: {
        enabled: boolean,
        heatmap: boolean,
        color_heatmap: boolean,
        interval: number,
      },
      thresholds: Array<number>,
    },
  },
};

export type AppProps = {|
  organizationId: string,
  serverURL: string,
  design: AppDesignProps,
  analytics: Analytics,
  serverBehavior?: ServerBehavior,
|};

export type ContextConfigProps = {|
  organizationId: string,
  serverURL: string,
  analytics: Analytics,
  flags: AppConfigFlags,
  serverBehavior: ServerBehavior,
|};

export type CardFeedState = {
  feedId: string,
  feedSource: string,
  feedCards: Array<FeedCard>,
};

export type AppFeedState = {
  feed: CardFeedState,
  loading: boolean,
  pagination: boolean,
};

export type CardTimestampData = {
  viewStartTimestamp: number,
  viewEndTimestamp: number,
  intersectionRatio: number,
  duration: number,
  threshold: number,
};

export type FeedTouchTrackingData = {
  x: number,
  y: number,
  viewHeight: number,
  feedY: number,
  timestamp: number,
  feedCard: ?FeedCard,
};

export type FeedPosTrackingData = {
  x: number,
  y: number,
  height: number,
  width: number,
  timestamp: number,
  viewHeight: number,
  feedCard: FeedCard,
};

export type VideoWatchDurationData = {
  viewStartTimestamp: number,
  viewEndTimestamp: number,
};

export type DispatchCommand = 'open' | 'close';
export type CustomAppEventOpen = {
  type: 'open',
};
export type CustomAppEventClose = {
  type: 'close',
};
export type CustomAppEvent = CustomAppEventOpen | CustomAppEventClose;

export type FeedTargets = Map<
  string,
  {
    element: HTMLElement,
    card: FeedCard,
  }
>;

export type FeedDurations = Map<
  string,
  {
    intersectionRatio: number,
    viewStartTimestamp: number,
  }
>;

export type FeedInView = Set<string>;

export type FeedTracker = {
  current: {
    analytics: Analytics,
    feedTargets: FeedTargets,
  },
};

export type MetricDuration = {
  startTimestamp: number,
  totalTime: number,
  visible: boolean,
  viewportEnterCount: number,
  target: HTMLElement,
};

export type MetricConstructor = {
  enabled: boolean,
  thresholds: Array<number>,
  heatmap: boolean,
  color_heatmap: boolean,
  interval: number,
  onUpdate: (
    durations: Map<string, MetricDuration>,
    type: 'action' | 'ping'
  ) => void,
};

'use strict';

exports.handler = function(event, context, callback) {
  const request = event.Records[0].cf.request;

  const mapping = [
    ['^/people.html$', 'https://www.psy.ox.ac.uk/research/perception-lab'],
    ['^/publications.html$', 'https://www.psy.ox.ac.uk/publications?author=hannah-smithson'],
    ['^/research-papers/AtkinsonSmithson_2013_EmotionReview.pdf$', 'https://www.psy.ox.ac.uk/publications/379671'],
    ['^/research-papers/AtkinsonVuongSmithson_2012_PointlightEmotion.pdf$', 'https://www.psy.ox.ac.uk/publications/244158'],
    ['^/research-papers/BhardwajMollonSmithson_2012_CompatibleRepresentations.pdf$', 'https://www.psy.ox.ac.uk/publications/352922'],
    ['^/research-papers/LeeDawsonSmithson_2012_SlowUpdating.pdf$', 'https://www.psy.ox.ac.uk/publications/244461'],
    ['^/research-papers/LeeMollonZaidiSmithson_2009_S-coneLatency.pdf$', 'https://www.psy.ox.ac.uk/publications/244462'],
    ['^/research-papers/LeeSmithson_2012_MultipleReferencesForColour.pdf$', 'https://www.psy.ox.ac.uk/publications/317144'],
    ['^/research-papers/PokornySmithsonQuinlan_2004_Photostimulator.pdf$', 'https://www.psy.ox.ac.uk/publications/244778'],
    ['^/research-papers/SmithMollonBhardwajSmithson_2011_BriefTemporalBuffering.pdf$', 'https://www.psy.ox.ac.uk/publications/244459'],
    ['^/research-papers/SmithsonDinkovaBruunGasperHuxtableMcLeishPanti_2012_Grosseteste.pdf$', 'https://www.psy.ox.ac.uk/publications/316962'],
    ['^/research-papers/SmithsonHenningMacLeodStockman_2009_Flicker.pdf$', 'https://www.psy.ox.ac.uk/publications/244457'],
    ['^/research-papers/SmithsonKhanSharpeStockman_2006_StroopTransitions.pdf$', 'https://www.psy.ox.ac.uk/publications/244453'],
    ['^/research-papers/SmithsonMollon_2001_ChromaticMasking.pdf$', 'https://www.psy.ox.ac.uk/publications/244470'],
    ['^/research-papers/SmithsonMollon_2004_ReactionTimes.pdf$', 'https://www.psy.ox.ac.uk/publications/244449'],
    ['^/research-papers/SmithsonMollon_2006_TerminatingIcon.pdf$', 'https://www.psy.ox.ac.uk/publications/244452'],
    ['^/research-papers/SmithsonSumnerMollon_2003_TritanLines.pdf$', 'https://www.psy.ox.ac.uk/publications/244712'],
    ['^/research-papers/SmithsonZaidi_2004_ColourConstancy.pdf$', 'https://www.psy.ox.ac.uk/publications/244450'],
    ['^/research-papers/Smithson_2005_ColourConstancy.pdf$', 'https://www.psy.ox.ac.uk/publications/244451'],
    ['^/research-papers/StockmanLangendorferSmithsonSharpe_2006_LightAdaptation.pdf$', 'https://www.psy.ox.ac.uk/publications/244454'],
    ['^/research-papers/StockmanSmithsonMichaelidesMooreWebsterSharpe_2007_AlphaTransducin.pdf$', 'https://www.psy.ox.ac.uk/publications/244464'],
    ['^/research-papers/StockmanSmithsonWebsterHolderRanaRipamontiSharpe_2008_BradyopsiaRGS9.pdf$', 'https://www.psy.ox.ac.uk/publications/244456'],
    ['^/research-papers/SunSmithsonZaidiLee_2006_AvoidSInput.pdf$', 'https://www.psy.ox.ac.uk/publications/244465'],
    ['^/research-papers/SunSmithsonZaidiLee_2006_SpecificityConeInputs.pdf$', 'https://www.psy.ox.ac.uk/publications/244466'],
    ['^/research-papers/YoungLiversedgeLoveMyersSmithson_2011_Reading.pdf$', 'https://www.psy.ox.ac.uk/publications/244460'],
    ['^/research-papers/YoungLoveSmithson_2013_Letters.pdf$', 'https://www.psy.ox.ac.uk/publications/426084'],
    ['^/research-papers/YoungLoveSmithson_2013_Metrics.pdf$', 'https://www.psy.ox.ac.uk/publications/414651'],
    ['^/research-papers/BrooksNewScientist_2012_OrderedUniverse.pdf$', 'https://www.newscientist.com/article/mg21328551-600-medieval-modern-master-colour-decoded-before-its-time/'],
    ['.?', 'https://www.psy.ox.ac.uk/team/hannah-smithson']
  ];

  let [_, redirectUrl] = mapping.find(([pattern, url]) => {
    return new RegExp(pattern).test(request.uri);
  });

  const response = {
    status: '301',
    statusDescription: 'Moved Permanently',
    headers: {
      location: [{
        key: 'Location',
        value: redirectUrl
      }],
    },
  };
  callback(null, response);
};

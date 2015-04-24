<?php

function fnSystem_rmdir($dir){
  if(is_dir($dir)){
    $oDirIterator = new RecursiveDirectoryIterator($dir);
    $oIterator = new RecursiveIteratorIterator($oDirIterator, RecursiveIteratorIterator::CHILD_FIRST);
    foreach($oIterator as $file) {
      if ($file->getFilename() === '.' || $file->getFilename() === '..') {
        continue;
      }
      if ($file->isDir()){
        rmdir($file->getRealPath());
      } else {
        unlink($file->getRealPath());
      }
    }
    rmdir($dir);
  }
}

ini_set('date.timezone','Europe/Paris');
set_time_limit(0);

// Path for the data archives
$dirDataTgz = dirname(__FILE__).DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'datas-tgz'.DIRECTORY_SEPARATOR;

// Listing of files
$arrayFiles = array();
$oDir = new DirectoryIterator($dirDataTgz);
foreach ($oDir as $oDirItem) {
  if ($oDirItem->isDot()) {
	continue;
  }
  if ($oDirItem->getExtension() != 'tgz') {
	continue;
  }
  $arrayFiles[] = pathinfo($oDirItem->getFilename(), PATHINFO_FILENAME);
}
asort($arrayFiles);

$arrayStats = array(
	'numApps' => array(),
	'rating' => array(
		'num' => array(),
		'amount' => array(),
		'average' => array(),
	),
	'stateDisabled' => array(
		0 => array(),
		1 => array(),
	),
	'statePackaged' => array(
		0 => array(),
		1 => array(),
	),
	'statePublicStats' => array(
		0 => array(),
		1 => array(),
	),
	'typeApp' => array(
		'hosted' => array(),
		'packaged' => array(),
		'privileged' => array(),
	),
	'typeDevice' => array(
		'android-mobile' => array(),
		'android-tablet' => array(),
		'desktop' => array(),
		'firefoxos' => array(),
	),
	'typePremium' => array(
		'free-inapp' => array(),
		'free' => array(),
		'premium' => array(),
		'premium-inapp' => array(),
		'other' => array(),
	),
	'lastMonth' => array(
		'avgRating0' => 0,
		'avgRating1' => 0,
		'avgRating2' => 0,
		'avgRating3' => 0,
		'avgRating4' => 0,
		'avgRating5' => 0,
		'createdDate' => array(),
		'geo' => array(),
	),
);

/**
 * Locales : http://www.science.co.il/Language/Locale-codes.asp
 * Country : http://jvectormap.com/maps/world/world/
 */
$arrayGeo = array(
	'ar' => 'AE',
	'bg' => 'BG',
	'bn-BD' => 'BD',
	'ca' => 'ES',
	'cs' => 'CZ',
	'de' => 'DE',
	'en-US' => 'US',
	'el' => 'GR',
	'es' => 'ES',
	'eu' => 'ES',
	'fa' => 'IR',
	'fi' => 'FI',
	'fr' => 'FR',
	'hr' => 'HR',
	'hu' => 'HU',
	'id' => 'ID',
	'it' => 'IT',
	'ja' => 'JP',
	'ko' => 'KR',
	'nl' => 'NL',
	'pl' => 'PL',
	'pt-BR' => 'BR',
	'pt-PT' => 'PT',
	'ro' => 'RO',
	'ru' => 'RU',
	'sl' => 'SI',
	'sq' => 'AL',
	'sr' => 'RS',
	'sv-SE' => 'SE',
	'ta' => 'IN',
	'tr' => 'TR',
	'vi' => 'VN',
	'zh-CN' => 'CN',
	'zh-TW' => 'TW',
);

foreach($arrayFiles as $key => $filename){
  // Création du dossier
  if(!file_exists($dirDataTgz.$filename)){
	mkdir($dirDataTgz.$filename);
  }
  // Décompression
  $archiveTGZ = new PharData($dirDataTgz.$filename.'.tgz');
  $archiveTGZ->decompress();
  unset($archiveTGZ);
  $archiveTAR = new PharData($dirDataTgz.$filename.'.tar');
  $archiveTAR->extractTo($dirDataTgz.$filename);
  unset($archiveTAR);

  // Initialization
  $arrayStats['numApps'][$filename] = 0;
  $arrayStats['rating']['num'][$filename] = 0;
  $arrayStats['rating']['amount'][$filename] = 0;
  $arrayStats['rating']['average'][$filename] = 0;
  $arrayStats['stateDisabled'][0][$filename] = 0;
  $arrayStats['stateDisabled'][1][$filename] = 0;
  $arrayStats['statePackaged'][0][$filename] = 0;
  $arrayStats['statePackaged'][1][$filename] = 0;
  $arrayStats['statePublicStats'][0][$filename] = 0;
  $arrayStats['statePublicStats'][1][$filename] = 0;
  $arrayStats['typeApp']['hosted'][$filename] = 0;
  $arrayStats['typeApp']['packaged'][$filename] = 0;
  $arrayStats['typeApp']['privileged'][$filename] = 0;
  $arrayStats['typeDevice']['desktop'][$filename] = 0;
  $arrayStats['typeDevice']['android-mobile'][$filename] = 0;
  $arrayStats['typeDevice']['android-tablet'][$filename] = 0;
  $arrayStats['typeDevice']['firefoxos'][$filename] = 0;
  $arrayStats['typePremium']['free-inapp'][$filename] = 0;
  $arrayStats['typePremium']['free'][$filename] = 0;
  $arrayStats['typePremium']['premium'][$filename] = 0;
  $arrayStats['typePremium']['premium-inapp'][$filename] = 0;
  $arrayStats['typePremium']['other'][$filename] = 0;
  
  $bLast = false;
  if ($key == count($arrayFiles) - 1) {
      $bLast = true;
  }
  
  // Analyse
  //@link : https://firefox-marketplace-api.readthedocs.org/en/latest/topics/export.html
  //@link : https://firefox-marketplace-api.readthedocs.org/en/latest/topics/apps.html#id2
  $oDirIterator = new RecursiveDirectoryIterator($dirDataTgz.$filename.'/apps');
  $oIterator = new RecursiveIteratorIterator($oDirIterator, RecursiveIteratorIterator::CHILD_FIRST);
  foreach($oIterator as $oFile) {
    if ($oFile->getFilename() === '.' || $oFile->getFilename() === '..' || !$oFile->isFile()) {
      continue;
    }
	$content = trim(file_get_contents($oFile->getPathname()));
	if($content == ''){
		continue;
	}
	// Application
	$oApp = json_decode($content);
	
	// Stats
    $arrayStats['numApps'][$filename]++;
	$arrayStats['typePremium'][$oApp->premium_type][$filename]++;
	$arrayStats['typeApp'][$oApp->app_type][$filename]++;
	foreach($oApp->device_types as $device_type){
	  $arrayStats['typeDevice'][$device_type][$filename]++;
    }
	$arrayStats['rating']['num'][$filename] += $oApp->ratings->count;
	$arrayStats['rating']['amount'][$filename] += $oApp->ratings->average;
	$arrayStats['rating']['average'][$filename] = $arrayStats['rating']['amount'][$filename] / $arrayStats['numApps'][$filename];
	// Boolean state
	if($oApp->is_disabled == true){
		$arrayStats['stateDisabled'][1][$filename]++;
	} else {
		$arrayStats['stateDisabled'][0][$filename]++;
	}
	if($oApp->is_packaged == true){
		$arrayStats['statePackaged'][1][$filename]++;
	} else {
		$arrayStats['statePackaged'][0][$filename]++;
	}
	if($oApp->public_stats == true){
		$arrayStats['statePublicStats'][1][$filename]++;
	} else {
		$arrayStats['statePublicStats'][0][$filename]++;
	}

	if($bLast && !empty($oApp->created)){
		// Creation date
		$dateCreated = substr($oApp->created, 0, 7);
		if(!isset($arrayStats['lastMonth']['createdDate'][$dateCreated.'-01'])){
			$arrayStats['lastMonth']['createdDate'][$dateCreated.'-01'] = 0;
		}
		$arrayStats['lastMonth']['createdDate'][$dateCreated.'-01']++;
		// Rating
		if($oApp->ratings->average >= 5){
          $arrayStats['lastMonth']['avgRating5']++;
        }
        if($oApp->ratings->average >= 4 && $oApp->ratings->average < 5){
          $arrayStats['lastMonth']['avgRating4']++;
        }
        if($oApp->ratings->average >= 3 && $oApp->ratings->average < 4){
          $arrayStats['lastMonth']['avgRating3']++;
        }
        if($oApp->ratings->average >= 2 && $oApp->ratings->average < 3){
          $arrayStats['lastMonth']['avgRating2']++;
        }
        if($oApp->ratings->average >= 1 && $oApp->ratings->average < 2){
          $arrayStats['lastMonth']['avgRating1']++;
        }
        if($oApp->ratings->average >= 0 && $oApp->ratings->average < 1){
          $arrayStats['lastMonth']['avgRating0']++;
        }
		// Locale
		if(isset($arrayGeo[$oApp->default_locale])){
			if(!isset($arrayStats['lastMonth']['geo'][$arrayGeo[$oApp->default_locale]])){
				$arrayStats['lastMonth']['geo'][$arrayGeo[$oApp->default_locale]] = 0;
			}
			$arrayStats['lastMonth']['geo'][$arrayGeo[$oApp->default_locale]]++;
		} else {
			echo $oApp->default_locale.PHP_EOL;
		}
	}
  }
  unset($oIterator);
  unset($oDirIterator);

  // Nettoyage
  if(file_exists($dirDataTgz.$filename.'.tar')){
    unlink($dirDataTgz.$filename.'.tar');
    fnSystem_rmdir($dirDataTgz.$filename);
  }
}

// After
ksort($arrayStats['lastMonth']['createdDate']);
ksort($arrayStats['lastMonth']['geo']);

file_put_contents('stats.json', json_encode($arrayStats));